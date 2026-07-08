import { createHash, randomBytes } from "crypto";
import type { ObjectId } from "mongodb";
import { getAuthCollection } from "@/lib/auth/mongodb";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

type AuthUser = {
  _id: ObjectId;
  username: string;
  email?: string;
  fullName?: string;
  passwordHash: string;
  passwordSalt: string;
  passwordIterations: number;
  passwordDigest: string;
  passwordResetTokenHash?: string;
  passwordResetExpiresAt?: Date;
  passwordResetRequestedAt?: Date;
  passwordResetUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const RESET_TOKEN_BYTES = 32;
const DEFAULT_RESET_MAX_AGE_MINUTES = 30;
const DEFAULT_RESET_COOLDOWN_SECONDS = 60;

function normalizeUsername(username: string) {
  return username.trim();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function ensureIndexes() {
  const collection = await getAuthCollection();
  await collection.createIndex({ username: 1 }, { unique: true });
  await collection.createIndex({ email: 1 }, { unique: true, sparse: true });
  await collection.createIndex({ passwordResetTokenHash: 1 }, { unique: true, sparse: true });
  await collection.createIndex({ passwordResetExpiresAt: 1 }, { sparse: true });
}

function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getResetMaxAgeMs() {
  const parsed = Number.parseInt(process.env.AUTH_PASSWORD_RESET_MAX_AGE_MINUTES || "", 10);
  const minutes = Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_RESET_MAX_AGE_MINUTES;
  return minutes * 60 * 1000;
}

function getResetCooldownMs() {
  const parsed = Number.parseInt(process.env.AUTH_PASSWORD_RESET_COOLDOWN_SECONDS || "", 10);
  const seconds = Number.isInteger(parsed) && parsed >= 0 ? parsed : DEFAULT_RESET_COOLDOWN_SECONDS;
  return seconds * 1000;
}

async function createBootstrapUser(username: string, password: string) {
  await ensureIndexes();
  const collection = await getAuthCollection();
  const now = new Date();
  const passwordConfig = hashPassword(password);

  await collection.updateOne(
    { username },
    {
      $setOnInsert: {
        username,
        createdAt: now,
      },
      $set: {
        passwordHash: passwordConfig.hash,
        passwordSalt: passwordConfig.salt,
        passwordIterations: passwordConfig.iterations,
        passwordDigest: passwordConfig.digest,
        updatedAt: now,
      },
    },
    { upsert: true },
  );
}

async function maybeBootstrapUser(username: string, password: string) {
  const bootstrapUsername = process.env.AUTH_BOOTSTRAP_USERNAME;
  const bootstrapPassword = process.env.AUTH_BOOTSTRAP_PASSWORD;

  if (!bootstrapUsername || !bootstrapPassword) return;
  if (username !== bootstrapUsername || password !== bootstrapPassword) return;

  await createBootstrapUser(username, password);
}

export async function verifyUserCredentials(usernameValue: string, password: string) {
  const username = normalizeUsername(usernameValue);

  if (!username || !password) return null;

  await maybeBootstrapUser(username, password);

  const collection = await getAuthCollection();
  const user = await collection.findOne<AuthUser>({ username });

  if (!user) return null;

  const valid = verifyPassword(password, {
    hash: user.passwordHash,
    salt: user.passwordSalt,
    iterations: user.passwordIterations,
    digest: user.passwordDigest,
  });

  if (!valid) return null;

  return {
    username: user.username,
  };
}

export async function createUserAccount(values: {
  username: string;
  email: string;
  fullName: string;
  password: string;
}) {
  await ensureIndexes();

  const username = normalizeUsername(values.username);
  const email = normalizeEmail(values.email);
  const collection = await getAuthCollection();
  const existing = await collection.findOne<AuthUser>({
    $or: [{ username }, { email }],
  });

  if (existing) {
    return {
      success: false as const,
      reason: existing.username === username ? "username" : "email",
    };
  }

  const now = new Date();
  const passwordConfig = hashPassword(values.password);

  await collection.insertOne({
    username,
    email,
    fullName: values.fullName.trim(),
    passwordHash: passwordConfig.hash,
    passwordSalt: passwordConfig.salt,
    passwordIterations: passwordConfig.iterations,
    passwordDigest: passwordConfig.digest,
    createdAt: now,
    updatedAt: now,
  });

  return {
    success: true as const,
    user: {
      username,
    },
  };
}

export async function createPasswordResetToken(emailValue: string) {
  await ensureIndexes();

  const email = normalizeEmail(emailValue);
  const collection = await getAuthCollection();
  const user = await collection.findOne<AuthUser>({ email });

  if (!user) {
    return {
      success: false as const,
    };
  }

  const now = new Date();
  const resetCooldownMs = getResetCooldownMs();

  if (
    resetCooldownMs > 0 &&
    user.passwordResetRequestedAt &&
    now.getTime() - user.passwordResetRequestedAt.getTime() < resetCooldownMs
  ) {
    return {
      success: false as const,
    };
  }

  const token = randomBytes(RESET_TOKEN_BYTES).toString("base64url");
  const expiresAt = new Date(now.getTime() + getResetMaxAgeMs());

  await collection.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetTokenHash: hashResetToken(token),
        passwordResetExpiresAt: expiresAt,
        passwordResetRequestedAt: now,
        updatedAt: now,
      },
      $unset: {
        passwordResetUsedAt: "",
      },
    },
  );

  return {
    success: true as const,
    email: user.email ?? email,
    fullName: user.fullName,
    username: user.username,
    token,
    expiresAt,
  };
}

export async function resetPasswordWithToken(token: string, password: string) {
  await ensureIndexes();

  const tokenHash = hashResetToken(token.trim());
  const collection = await getAuthCollection();
  const now = new Date();
  const user = await collection.findOne<AuthUser>({
    passwordResetTokenHash: tokenHash,
    passwordResetExpiresAt: { $gt: now },
  });

  if (!user) {
    return {
      success: false as const,
    };
  }

  const passwordConfig = hashPassword(password);
  const result = await collection.updateOne(
    {
      _id: user._id,
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: now },
    },
    {
      $set: {
        passwordHash: passwordConfig.hash,
        passwordSalt: passwordConfig.salt,
        passwordIterations: passwordConfig.iterations,
        passwordDigest: passwordConfig.digest,
        passwordResetUsedAt: now,
        updatedAt: now,
      },
      $unset: {
        passwordResetTokenHash: "",
        passwordResetExpiresAt: "",
        passwordResetRequestedAt: "",
      },
    },
  );

  if (result.modifiedCount !== 1) {
    return {
      success: false as const,
    };
  }

  return {
    success: true as const,
    user: {
      username: user.username,
    },
  };
}

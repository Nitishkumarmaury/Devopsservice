import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const ITERATIONS = 160000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");

  return {
    hash,
    salt,
    iterations: ITERATIONS,
    digest: DIGEST,
  };
}

export function verifyPassword(
  password: string,
  config: { hash: string; salt: string; iterations: number; digest: string },
) {
  const expected = Buffer.from(config.hash, "hex");
  const actual = pbkdf2Sync(password, config.salt, config.iterations, expected.length, config.digest).toString("hex");
  const actualBuffer = Buffer.from(actual, "hex");

  return expected.length === actualBuffer.length && timingSafeEqual(expected, actualBuffer);
}

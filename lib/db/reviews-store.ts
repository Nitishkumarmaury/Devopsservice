import fs from "node:fs";
import path from "node:path";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { getReviewsCollection } from "@/lib/auth/mongodb";

export type StoredReview = Testimonial & {
  id: string;
  createdAt: string;
  isUserSubmitted?: boolean;
};

const DB_DIR = path.join(process.cwd(), "data", "db");
const DB_FILE = path.join(DB_DIR, "user-reviews.json");

// Local fallbacks make development convenient. Production intentionally never
// uses them: serverless files and process memory are not durable databases.
const inMemoryReviews: StoredReview[] = [];

function canUseLocalStore() {
  return process.env.NODE_ENV !== "production";
}

function ensureDbFile() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Local DB directory/file creation skipped (read-only filesystem):", err);
  }
}

function getLocalUserReviews(): StoredReview[] {
  try {
    ensureDbFile();
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, "utf-8");
      const reviews: StoredReview[] = JSON.parse(fileData || "[]");
      return [...inMemoryReviews, ...reviews];
    }
  } catch (error) {
    console.warn("Local DB file read error, falling back to in-memory reviews:", error);
  }
  return inMemoryReviews;
}

function saveLocalReview(entry: StoredReview) {
  ensureDbFile();
  const existing = fs.existsSync(DB_FILE)
    ? (JSON.parse(fs.readFileSync(DB_FILE, "utf-8") || "[]") as StoredReview[])
    : [];
  fs.writeFileSync(DB_FILE, JSON.stringify([entry, ...existing], null, 2), "utf-8");
}

function databaseUnavailableError() {
  return new Error("The reviews database is unavailable. Please try again shortly.");
}

export async function getUserReviews(): Promise<StoredReview[]> {
  if (process.env.MONGODB_URI) {
    try {
      const collection = await getReviewsCollection();
      const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();

      return docs.map((doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        position: doc.position,
        company: doc.company,
        avatar: doc.avatar,
        rating: doc.rating,
        quote: doc.quote,
        project: doc.project,
        industry: doc.industry,
        serviceCategory: doc.serviceCategory,
        verified: doc.verified ?? true,
        date: doc.date,
        createdAt: doc.createdAt ?? new Date().toISOString(),
        isUserSubmitted: true,
      }));
    } catch (error) {
      console.error("MongoDB reviews fetch error:", error);
      if (!canUseLocalStore()) throw databaseUnavailableError();
      return getLocalUserReviews();
    }
  }

  if (!canUseLocalStore()) throw new Error("MONGODB_URI is not configured for reviews.");
  return getLocalUserReviews();
}

export async function getAllReviews(): Promise<StoredReview[]> {
  const userReviews = await getUserReviews();
  const staticReviews: StoredReview[] = testimonials.map((t, idx) => ({
    ...t,
    id: `static-${idx}`,
    createdAt: new Date().toISOString(),
    isUserSubmitted: false,
  }));

  // User-submitted reviews first, followed by static seed reviews
  return [...userReviews, ...staticReviews];
}

export async function addReview(newReview: Omit<Testimonial, "avatar">): Promise<StoredReview> {
  const initials =
    newReview.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "CL";

  const entry: StoredReview = {
    ...newReview,
    avatar: initials,
    id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    isUserSubmitted: true,
  };

  if (process.env.MONGODB_URI) {
    try {
      const collection = await getReviewsCollection();
      await collection.insertOne({
        ...entry,
        createdAt: new Date().toISOString(),
      });
      return entry;
    } catch (error) {
      console.error("Failed to insert review into MongoDB:", error);
      if (!canUseLocalStore()) throw databaseUnavailableError();
    }
  } else if (!canUseLocalStore()) {
    throw new Error("MONGODB_URI is not configured for reviews.");
  }

  // Development-only local fallback.
  try {
    saveLocalReview(entry);
  } catch (error) {
    console.warn("Could not persist review to filesystem (read-only environment):", error);
    inMemoryReviews.unshift(entry);
  }

  return entry;
}

import fs from "node:fs";
import path from "node:path";
import { testimonials, type Testimonial } from "@/data/testimonials";

export type StoredReview = Testimonial & {
  id: string;
  createdAt: string;
  isUserSubmitted?: boolean;
};

const DB_DIR = path.join(process.cwd(), "data", "db");
const DB_FILE = path.join(DB_DIR, "user-reviews.json");

function ensureDbFile() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getUserReviews(): StoredReview[] {
  try {
    ensureDbFile();
    const fileData = fs.readFileSync(DB_FILE, "utf-8");
    const reviews: StoredReview[] = JSON.parse(fileData || "[]");
    return reviews;
  } catch (error) {
    console.error("Error reading user reviews database:", error);
    return [];
  }
}

export function getAllReviews(): StoredReview[] {
  const userReviews = getUserReviews();
  const staticReviews: StoredReview[] = testimonials.map((t, idx) => ({
    ...t,
    id: `static-${idx}`,
    createdAt: new Date().toISOString(),
    isUserSubmitted: false,
  }));

  // User-submitted reviews first, followed by static reviews
  return [...userReviews, ...staticReviews];
}

export function addReview(newReview: Omit<Testimonial, "avatar">): StoredReview {
  ensureDbFile();
  const existing = getUserReviews();

  // Generate initials for avatar
  const initials = newReview.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "CL";

  const entry: StoredReview = {
    ...newReview,
    avatar: initials,
    id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: new Date().toISOString(),
    isUserSubmitted: true,
  };

  const updated = [entry, ...existing];
  fs.writeFileSync(DB_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return entry;
}

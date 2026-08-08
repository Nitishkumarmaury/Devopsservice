import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | undefined;

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect().catch((error) => {
      // Do not leave a rejected connection promise cached forever. A later
      // request can reconnect after a brief database or network outage.
      clientPromise = undefined;
      throw error;
    });
  }

  return clientPromise;
}

function getDatabaseName() {
  // Keep reviews in the same database as the existing authentication data.
  return process.env.AUTH_DB_NAME || "Devopsservice";
}

export async function getAuthCollection() {
  const client = await getMongoClient();
  const dbName = getDatabaseName();
  const collectionName = process.env.AUTH_USERS_COLLECTION || "users";

  return client.db(dbName).collection(collectionName);
}

export async function getReviewsCollection() {
  const client = await getMongoClient();
  return client.db(getDatabaseName()).collection(process.env.REVIEWS_COLLECTION || "reviews");
}

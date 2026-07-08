import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | undefined;

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  clientPromise ??= new MongoClient(uri).connect();
  return clientPromise;
}

export async function getAuthCollection() {
  const client = await getMongoClient();
  const dbName = process.env.AUTH_DB_NAME || "Devopsservice";
  const collectionName = process.env.AUTH_USERS_COLLECTION || "users";

  return client.db(dbName).collection(collectionName);
}

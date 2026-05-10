import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = mongoClient;
}

export async function getDb() {
  await mongoClient.connect();
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing MONGODB_DB");
  return mongoClient.db(dbName);
}
import { load } from "dotenv";
const env = await load();

const MONGO_URL = env["MONGO_URL"] || "mongodb://localhost:27017";
const DB_NAME = env["DB_NAME"] || "evnets";

export { MONGO_URL, DB_NAME };

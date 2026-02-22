import { MongoClient } from "mongodb";
import { env } from "./env.js";

// Create the instance
export const dbClint = new MongoClient(env.MONGODB_URL);

// console.log(env.MONGODB_URL)

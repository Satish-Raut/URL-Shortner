// import { readFile, writeFile } from "fs/promises";
// import path from "path";

// const DATA_FILE = path.join("data", "links.json");

// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8"); // Read all the data from the particular file path
//     return JSON.parse(data); // Return that JSON data in JS Object format
//   } catch (error) {
//     console.error(error);
//     if (error.code === "ENOENT") // If there is no any data file available
//     {
//       await writeFile(DATA_FILE, JSON.stringify({})); // Create the data file with an empty object
//       return {};
//     }
//     throw error;
//   }
// };

// export const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
// };

/* NOTE: Handling all login using MongoDB database */
import { dbClint } from "../config/db-clint.js";
import { env } from "../config/env.js";

const db = dbClint.db(env.MONGODB_DATABASE_NAME); // 'Create the database'
const shortnerCollection = db.collection("urls");

export const loadLinks = async()=>{
    return shortnerCollection.find().toArray();
}

export const saveLinks = async (link)=>{
    return shortnerCollection.insertOne(link)
}

export const getLinkByShortcode = async (shortCode) => {
    return await shortnerCollection.findOne({shortCode:shortCode})
}
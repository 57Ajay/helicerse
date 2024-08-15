import { config } from "dotenv";
config();

export const dbURL = process.env.MONGODB_URL;
export const dbName = "heliverse";

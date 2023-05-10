import * as dotenv from "dotenv";
dotenv.config();

export const VERSION_API = "v1";
export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_URI = process.env.DB_URI
export const PORT = process.env.PORT;
export const API_KEY_EMAIL = process.env.API_KEY_SENDERGRID



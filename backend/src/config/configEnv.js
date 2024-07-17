"use strict";
// Import the 'path' module to get the absolute path of the .env file
import path from "node:path";
import { fileURLToPath } from 'node:url';

// Obtain the current directory from import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Get the absolute path of the .env file. */
const envFilePath = path.resolve(__dirname, ".env");
// Load environment variables from the .env file
import dotenv from "dotenv";
dotenv.config({ path: envFilePath });

/** Server port */
export const PORT = process.env.PORT;
/** Server host */
export const HOST = process.env.HOST;
/** Database URL */
export const DB_URL = process.env.DB_URL;
/** Access token secret */
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Refresh token secret */
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;
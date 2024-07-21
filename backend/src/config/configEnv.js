"use strict";
// Importe el módulo 'path' para obtener la ruta absoluta del archivo .env
import path from "node:path";
import { fileURLToPath } from "node:url";

// Obtener el actual directorio desde import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Obtener la ruta absoluta del archivo .env */
const envFilePath = path.resolve(__dirname, ".env");
// Cargas variables de entorno desde el archivo .env
import dotenv from "dotenv";
dotenv.config({ path: envFilePath });

/** Server port */
export const PORT = process.env.PORT;
/** Server host */
export const HOST = process.env.HOST;
/** Database URL */
export const DB_URL = process.env.DB_URL;
/** Refrescar token secreto */
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Refrescar token secreto */
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

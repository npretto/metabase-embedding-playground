import { configDotenv } from "dotenv";

configDotenv();

const assertExists = <T>(something: T | undefined): T => {
  if (something === undefined) {
    throw new Error("Expected value to be defined");
  }
  return something
}


export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8001

export const BASE_URL = assertExists(process.env.BASE_URL);

export const MB_BASE_URL = assertExists(process.env.MB_BASE_URL);

export const METABASE_SECRET_KEY = assertExists(process.env.METABASE_SECRET_KEY);

export const METABASE_JWT_SECRET = assertExists(process.env.METABASE_JWT_SECRET);

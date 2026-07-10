import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { isDbConfigured } from "@/lib/env";

const sql = neon(
  process.env.DATABASE_URL ?? "postgresql://user:password@localhost.neon.tech/db"
);

export const db = drizzle(sql, { schema });

export { isDbConfigured };

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

export const db = drizzle({
  client: neon(process.env.DATABASE_URL!),
  schema,
});

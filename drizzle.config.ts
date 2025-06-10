import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./server/db/auth.schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://localhost:5432/constructa",
  },
})
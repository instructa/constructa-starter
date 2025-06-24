import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  macros: defineTable({
    userId: v.string(),
    date: v.string(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
    calories: v.number(),
    createdAt: v.number(),
  })
    .index("by_userId_date", ["userId", "date"]),
});
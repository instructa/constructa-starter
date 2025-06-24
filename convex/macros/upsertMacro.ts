import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { api } from "../_generated/api";

export const upsertMacro = mutation({
  args: {
    date: v.string(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
    sessionToken: v.string(),
  },
  handler: async (ctx, { date, protein, carbs, fat, sessionToken }) => {
    // Verify the session
    const session = await ctx.runQuery(api.betterAuth.getSession, { sessionToken });
    if (!session || !session.userId) {
      throw new Error("Unauthorized");
    }

    // Calculate calories
    const calories = protein * 4 + carbs * 4 + fat * 9;

    // Check if there's already an entry for this date
    const existing = await ctx.db
      .query("macros")
      .withIndex("by_userId_date", (q) =>
        q.eq("userId", session.userId).eq("date", date)
      )
      .first();

    if (existing) {
      // Update existing entry
      await ctx.db.patch(existing._id, {
        protein,
        carbs,
        fat,
        calories,
      });
    } else {
      // Insert new entry
      await ctx.db.insert("macros", {
        userId: session.userId,
        date,
        protein,
        carbs,
        fat,
        calories,
        createdAt: Date.now(),
      });
    }
  },
});
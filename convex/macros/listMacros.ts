import { v } from "convex/values";
import { query } from "../_generated/server";
import { api } from "../_generated/api";

export const listMacros = query({
  args: { 
    date: v.string(),
    sessionToken: v.string() // Pass session token from client
  },
  handler: async (ctx, { date, sessionToken }) => {
    // Verify the session using better-auth's getSession
    const session = await ctx.runQuery(api.betterAuth.getSession, { sessionToken });
    if (!session || !session.userId) {
      throw new Error("Unauthorized");
    }

    return ctx.db
      .query("macros")
      .withIndex("by_userId_date", (q) =>
        q.eq("userId", session.userId).eq("date", date)
      )
      .collect();
  },
});
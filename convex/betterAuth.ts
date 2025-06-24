import { ConvexHandler } from "@better-auth-kit/convex/handler";
import { action, internalMutation, internalQuery } from "./_generated/server";

export const { 
  betterAuth, 
  query, 
  insert, 
  update, 
  delete_, 
  count, 
  getSession 
} = ConvexHandler({
  action,
  internalQuery,
  internalMutation,
  internal: {
    betterAuth: {
      query: internalQuery(async ({ db }, { tableName, query, order, single, limit, offset }) => {
        // Implementation will be handled by the ConvexHandler
        return null;
      }),
      insert: internalMutation(async ({ db }, { tableName, values }) => {
        // Implementation will be handled by the ConvexHandler
        return null;
      }),
      update: internalMutation(async ({ db }, { tableName, query, update }) => {
        // Implementation will be handled by the ConvexHandler
      }),
      delete_: internalMutation(async ({ db }, { tableName, query, deleteAll }) => {
        // Implementation will be handled by the ConvexHandler
      }),
      count: internalQuery(async ({ db }, { query, tableName }) => {
        // Implementation will be handled by the ConvexHandler
        return 0;
      }),
      getSession: internalQuery(async ({ db }, { sessionToken }) => {
        // Implementation will be handled by the ConvexHandler
        return null;
      }),
    },
  },
});
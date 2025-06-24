import { ConvexQueryClient } from "@convex-dev/react-query";
import { convex } from "./convex-client";
import { QueryClient } from "@tanstack/react-query";

export const convexQueryClient = new ConvexQueryClient(convex);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});

convexQueryClient.connect(queryClient);
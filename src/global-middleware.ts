import { registerGlobalMiddleware } from "@tanstack/react-start"
import { logMiddleware } from "~/utils/loggingMiddleware"
import { securityMiddleware } from "~/utils/securityMiddleware";

registerGlobalMiddleware({
    middleware: [logMiddleware, securityMiddleware]
})
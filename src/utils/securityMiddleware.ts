import { NextFunction, RequestContext } from "@tanstack/react-start/server";
import { setCookie, getCookie } from "@tanstack/react-start/server";

const RATE_LIMIT = 10; // requests
const WINDOW_MS = 60_000; // 1 min
const buckets = new Map<string, number[]>();

function cleanupBucket(tsArr: number[]) {
  const cutoff = Date.now() - WINDOW_MS;
  while (tsArr.length && tsArr[0] < cutoff) tsArr.shift();
}

export async function securityMiddleware(ctx: RequestContext, next: NextFunction) {
  const url = new URL(ctx.request.url);
  const isAuthRoute = url.pathname.startsWith("/api/auth");

  // 1. ‑‑ HTTPS enforcement & HSTS
  const isProd = process.env.NODE_ENV === "production";
  if (isProd && url.protocol === "http:") {
    return Response.redirect("https://" + url.host + url.pathname + url.search, 301);
  }

  // 2. ‑‑ Basic rate‑limit on auth routes
  if (isAuthRoute) {
    const ip = ctx.request.headers.get("x-forwarded-for") ?? ctx.request.headers.get("x-real-ip") ?? "unknown";
    const bucket = buckets.get(ip) ?? [];
    cleanupBucket(bucket);
    if (bucket.length >= RATE_LIMIT) {
      return new Response("Too many requests", { status: 429 });
    }
    bucket.push(Date.now());
    buckets.set(ip, bucket);
  }

  // 3. ‑‑ CSRF double‑submit check for state‑changing auth requests
  if (isAuthRoute && ctx.request.method !== "GET" && ctx.request.method !== "HEAD") {
    const headerToken = ctx.request.headers.get("x-csrf-token");
    const cookieToken = getCookie("csrfToken");
    if (!headerToken || !cookieToken || headerToken !== cookieToken) {
      return new Response("Invalid CSRF token", { status: 403 });
    }
  }

  // Ensure the browser always has a CSRF cookie
  if (!getCookie("csrfToken")) {
    const token = crypto.randomUUID();
    setCookie("csrfToken", token, {
      path: "/",
      secure: isProd,
      sameSite: "lax",
    });
  }

  // Proceed down the chain
  const resp = await next();

  // 4. ‑‑ Inject HSTS header on responses in prod
  if (isProd) {
    resp.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }
  return resp;
}
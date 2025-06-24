/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as betterAuth from "../betterAuth.js";
import type * as http from "../http.js";
import type * as macros_listMacros from "../macros/listMacros.js";
import type * as macros_upsertMacro from "../macros/upsertMacro.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  betterAuth: typeof betterAuth;
  http: typeof http;
  "macros/listMacros": typeof macros_listMacros;
  "macros/upsertMacro": typeof macros_upsertMacro;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

// logger.ts
// import { serverEnvSchema } from '~/env';
// import { collectRuntimeEnv } from '~/env/runtime-values';
import { captureMessage, getCurrentHub, withScope } from '@sentry/core';
import { redact, redactDeep } from '~/lib/security/token-redaction';

const isBrowser = typeof window !== 'undefined';

const originalConsole = {
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  debug: (console.debug || console.log).bind(console),
};

const importMetaEnv = (() => {
  try {
    return (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  } catch {
    return undefined;
  }
})();

const readEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key];
  }
  const viteKey = `VITE_${key}`;
  if (importMetaEnv?.[viteKey]) {
    return importMetaEnv[viteKey];
  }
  const globalVal = (globalThis as unknown as Record<string, string | undefined>)[key];
  return globalVal;
};
type Level = 'verbose' | 'debug' | 'info' | 'warn' | 'error';

// Get LOG_LEVEL from validated environment, default to 'debug' for development
// const logLevelSchema = serverEnvSchema.pick({ LOG_LEVEL: true }).partial();

const resolvedLogLevel = (() => {
  return 'debug';
  // const parsed = logLevelSchema.safeParse(collectRuntimeEnv());
  // return parsed.success ? parsed.data.LOG_LEVEL : undefined;
})();

const LOG_LEVEL =
  resolvedLogLevel ||
  readEnv('LOG_LEVEL') ||
  'debug'; // Changed default to 'debug' to see all logs

const LOG_LEVELS: Record<Level, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
};

const normalizeBool = (value: string | undefined, fallback = true) => {
  if (value === undefined) return fallback;
  const normalized = value.toLowerCase();
  return normalized !== 'false' && normalized !== '0' && normalized !== 'off';
};

const SENTRY_LOG_LEVEL = (() => {
  const raw = readEnv('SENTRY_LOG_LEVEL');
  return raw && raw in LOG_LEVELS ? (raw as Level) : 'warn';
})();

const SENTRY_LOGGING_ENABLED = normalizeBool(readEnv('SENTRY_LOGGING'));
const CONSOLE_PATCH_ENABLED = normalizeBool(readEnv('CONSOLE_LOGGER_PATCH'));

const shouldLog = (level: Level): boolean => {
  return LOG_LEVELS[level] <= LOG_LEVELS[LOG_LEVEL as Level];
};

/**
 * Create a condensed log entry
 * @param level - Log level
 * @param msg - Log message
 * @param meta - Metadata
 */
function createCondensedLog(level: Level, msg: string, meta: Record<string, unknown> = {}) {
  // For DEBUG level with condensed format, extract key information
  if (LOG_LEVEL === 'debug') {
    // Extract key information from meta
    const condensedMeta: Record<string, unknown> = {};

    // Extract request information if present
    if (meta.requestId) {
      condensedMeta.requestId = meta.requestId;
    }

    if (meta.url) {
      condensedMeta.url = meta.url;
    }

    if (meta.method) {
      condensedMeta.method = meta.method;
    }

    if (meta.jobId) condensedMeta.jobId = meta.jobId;
    if ('projectId' in meta && meta.projectId !== undefined)
      condensedMeta.projectId = meta.projectId;
    if ('repo' in meta && meta.repo !== undefined) condensedMeta.repo = meta.repo;
    if ('id' in meta && meta.id !== undefined) condensedMeta.id = meta.id;
    if ('storageMode' in meta && meta.storageMode !== undefined)
      condensedMeta.storageMode = meta.storageMode;

    if (meta.phase) condensedMeta.phase = meta.phase;

    if (meta.status) condensedMeta.status = meta.status;

    // Add any error information
    if (meta.error) {
      condensedMeta.error = meta.error;
    }

    return {
      level,
      msg: redact(String(msg || '')),
      timestamp: new Date().toISOString(),
      ...redactDeep(condensedMeta),
    };
  }

  // For non-debug levels (including 'verbose'), include all metadata
  return {
    level,
    msg: redact(String(msg || '')),
    timestamp: new Date().toISOString(),
    ...redactDeep(meta),
  };
}

/**
 * Core logging function
 * @param level - Log level (debug, info, warn, error)
 * @param msg - Log message
 * @param meta - Additional metadata to include in the log
 */
function log(level: Level, msg: string, meta: Record<string, unknown> = {}) {
  // Skip logging if level is below configured level
  if (!shouldLog(level)) {
    return;
  }

  const entry = createCondensedLog(level, msg, meta);

  const { level: _ignoredLevel, msg: entryMsg, ...rest } = entry;
  forwardToSentry(level, entryMsg, rest);

  const consoleMethod =
    level === 'error' ? 'error' : level === 'warn' ? 'warn' : level === 'info' ? 'info' : level === 'debug' ? 'debug' : 'log';
  originalConsole[consoleMethod]?.(entry);
}

// Convenience methods for each log level
export const logger = {
  verbose: (msg: string, meta?: Record<string, unknown>) => log('verbose', msg, meta),
  debug: (msg: string, meta?: Record<string, unknown>) => log('debug', msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => log('info', msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => log('warn', msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => log('error', msg, meta),
};

const formatValue = (value: unknown): string => {
  if (value instanceof Error) {
    return `${value.name}: ${value.message}`;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined) {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const logThroughLogger = (level: Level, args: unknown[]) => {
  if (!args.length) return;
  const message = args.map(formatValue).join(' ');
  logger[level](message);
};

let consolePatched = false;

const patchConsoleWithLogger = () => {
  if (consolePatched || !CONSOLE_PATCH_ENABLED) {
    return;
  }
  consolePatched = true;
  const mapping: Record<'log' | 'info' | 'warn' | 'error' | 'debug', Level> = {
    log: 'info',
    info: 'info',
    warn: 'warn',
    error: 'error',
    debug: 'debug',
  };

  (Object.keys(mapping) as Array<keyof typeof mapping>).forEach((method) => {
    (console as Record<string, (...values: unknown[]) => void>)[method] = (...values: unknown[]) =>
      logThroughLogger(mapping[method], values);
  });
};

if (CONSOLE_PATCH_ENABLED) {
  patchConsoleWithLogger();
}

export { patchConsoleWithLogger };
const SENTRY_LEVEL_MAP: Record<Level, 'debug' | 'info' | 'warning' | 'error'> = {
  verbose: 'debug',
  debug: 'debug',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

const shouldForwardToSentry = (level: Level) => {
  if (!SENTRY_LOGGING_ENABLED) return false;
  return LOG_LEVELS[level] <= LOG_LEVELS[SENTRY_LOG_LEVEL];
};

const forwardToSentry = (level: Level, message: string, meta: Record<string, unknown>) => {
  if (!shouldForwardToSentry(level)) return;

  try {
    const hub = getCurrentHub();
    const client = hub?.getClient?.();
    if (!client) return;

    withScope((scope) => {
      scope.setLevel?.(SENTRY_LEVEL_MAP[level]);
      scope.setTag?.('logger', 'app');
      if (Object.keys(meta).length > 0) {
        scope.setContext?.('meta', meta as Record<string, unknown>);
      }
      captureMessage(message, SENTRY_LEVEL_MAP[level]);
    });
  } catch {
    // swallow Sentry forwarding failures
  }
};

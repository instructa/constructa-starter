import { Mastra } from '@mastra/core';
import { codebaseAgent } from '~/mastra/agents/codebase-agent';

// Silence Mastra's telemetry warning in non-mastra-server environments.
const globalScope = globalThis as Record<string, unknown>;
if (!globalScope['___MASTRA_TELEMETRY___']) {
  globalScope['___MASTRA_TELEMETRY___'] = true;
}

export const mastra = new Mastra({
  agents: {
    'codebase-agent': codebaseAgent,
  },
});

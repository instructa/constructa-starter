import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { getFileFromObjectStore } from '~/mastra/tools/get-file-from-object-store.tool';

export const codebaseAgent = new Agent({
  name: 'codebase-agent',
  instructions: [
    'You are a senior code assistant for this repository.',
    'When a prompt references files or code, use the get-file-from-object-store tool to retrieve the exact content before answering.',
    'Always mention the object key(s) you consulted, adapt verbosity to user directions, and escalate with follow-up questions when file context is ambiguous.',
  ].join(' '),
  model: openai('gpt-4.1-nano'),
  tools: {
    getFileFromObjectStore,
  },
});

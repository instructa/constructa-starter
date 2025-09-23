import { json } from '@tanstack/react-start';
import { createServerFileRoute } from '@tanstack/react-start/server';
import { z } from 'zod';
import { mastra } from '~/mastra';

const MessageSchema = z
  .object({
    id: z.string().optional(),
    role: z.enum(['user', 'assistant', 'system', 'tool']),
    content: z.any().optional(),
    parts: z.any().optional(),
    metadata: z.record(z.any()).optional(),
  })
  .passthrough();

const ChatPayloadSchema = z
  .object({
    messages: z.array(MessageSchema).min(1),
  })
  .passthrough();

export const ServerRoute = createServerFileRoute('/api/chat').methods({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const { messages } = ChatPayloadSchema.parse(body);

      const agent = mastra.getAgent('codebase-agent');
      const stream = await agent.streamVNext(messages, {
        format: 'aisdk',
        onError: ({ error }) => {
          console.error('Mastra streamVNext onError', error);
        },
      });

      return stream.toUIMessageStreamResponse();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return json({ error: 'Invalid request body', details: error.issues }, { status: 400 });
      }

      const message = error instanceof Error ? error.message : 'Unexpected error';
      console.error('POST /api/chat error', error);
      return json({ error: message }, { status: 500 });
    }
  },
});

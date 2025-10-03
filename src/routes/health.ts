import { createFileRoute } from '@tanstack/react-router';

const jsonOk = () =>
  Response.json(
    { status: 'ok' },
    {
      headers: { 'content-type': 'application/json; charset=utf-8' },
      status: 200,
    },
  );

export const Route = createFileRoute('/health')({
  component: () => null,
  server: {
    handlers: {
      GET: jsonOk,
      HEAD: () => new Response(null, { status: 200 }),
    },
  },
});

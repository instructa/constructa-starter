import { createMiddleware } from '@tanstack/react-start';

const preLogMiddleware = createMiddleware()
  .client(async (ctx) => {
    const clientTime = new Date();

    return ctx.next({
      context: {
        clientTime,
      },
      sendContext: {
        clientTime,
      },
    });
  })
  .server(async (ctx) => {
    const clientTime = ctx.context.clientTime ?? new Date();
    const serverTime = new Date();

    return ctx.next({
      sendContext: {
        serverTime,
        durationToServer: serverTime.getTime() - clientTime.getTime(),
        clientTime,
      },
    });
  });

export const logMiddleware = createMiddleware()
  .middleware([preLogMiddleware])
  .client(async (ctx) => {
    const res = await ctx.next();

    const now = new Date();
    const responseContext = res.context ?? {};
    const clientTime = responseContext.clientTime ?? now;
    const serverTime = responseContext.serverTime ?? now;
    const durationToServer = responseContext.durationToServer ?? 0;

    // eslint-disable-next-line no-console
    console.log('Client Req/Res:', {
      duration: clientTime.getTime() - now.getTime(),
      durationToServer,
      durationFromServer: now.getTime() - serverTime.getTime(),
    });

    return res;
  });

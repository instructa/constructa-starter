import { createStart } from '@tanstack/react-start';
import { logMiddleware } from '~/utils/loggingMiddleware';

export const startInstance = createStart(() => ({}));

export const start = startInstance;

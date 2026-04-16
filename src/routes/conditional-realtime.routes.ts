import { Router } from 'express';
import { ConditionalRealtimeController } from '@/controllers/conditional-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Conditional Realtime Routes.
 */
export function createConditionalRealtimeRoutes(controller: ConditionalRealtimeController): Router {
  const router = Router();

  router.post('/conditional/event', serviceAuth, controller.handleConditionalEvent);
  router.post(
    '/conditional-requirement/event',
    serviceAuth,
    controller.handleConditionalRequirementEvent
  );

  return router;
}

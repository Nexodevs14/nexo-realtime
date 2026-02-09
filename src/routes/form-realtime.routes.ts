import { Router } from 'express';
import { FormRealtimeController } from '@/controllers/form-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Form Realtime Routes
 */
export function createFormRealtimeRoutes(controller: FormRealtimeController): Router {
  const router = Router();

  router.post('/forms/duplicated', serviceAuth, controller.handleDuplicated);

  return router;
}

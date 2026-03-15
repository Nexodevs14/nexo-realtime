import { Router } from 'express';
import { AuditExecutionRealtimeController } from '@/controllers/audit-execution-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Audit Execution Realtime Routes
 */
export function createAuditExecutionRealtimeRoutes(
  controller: AuditExecutionRealtimeController
): Router {
  const router = Router();

  router.post('/audit-execution/event', serviceAuth, controller.handleAuditExecutionEvent);

  return router;
}

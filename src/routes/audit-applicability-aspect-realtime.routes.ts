import { Router } from 'express';
import { AuditApplicabilityAspectRealtimeController } from '@/controllers/audit-applicability-aspect-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Audit Applicability Aspect Realtime Routes.
 */
export function createAuditApplicabilityAspectRealtimeRoutes(
  controller: AuditApplicabilityAspectRealtimeController
): Router {
  const router = Router();

  router.post(
    '/audit-applicability-aspect/event',
    serviceAuth,
    controller.handleAuditApplicabilityAspectEvent
  );

  return router;
}

import { Router } from 'express';
import { ConditionalActionPlanRealtimeController } from '@/controllers/conditional-action-plan-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Conditional Action Plan Realtime Routes.
 */
export function createConditionalActionPlanRealtimeRoutes(
  controller: ConditionalActionPlanRealtimeController
): Router {
  const router = Router();

  router.post('/conditional-action-plan/event', serviceAuth, controller.handleActionPlanEvent);
  router.post(
    '/conditional-action-plan/backup-completed',
    serviceAuth,
    controller.handleExportCompleted
  );
  router.post(
    '/conditional-action-plan/report-export-completed',
    serviceAuth,
    controller.handleExportCompleted
  );
  router.post('/conditional-action-plan-task/event', serviceAuth, controller.handleTaskEvent);
  router.post(
    '/conditional-action-plan-task-comment/event',
    serviceAuth,
    controller.handleTaskCommentEvent
  );
  router.post(
    '/conditional-action-plan-task-evidence/event',
    serviceAuth,
    controller.handleTaskEvidenceEvent
  );

  return router;
}

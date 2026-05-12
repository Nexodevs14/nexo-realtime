import { Router } from 'express';
import { ComplianceActionPlanRealtimeController } from '@/controllers/action-plan-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Action Plan Realtime Routes.
 */
export function createComplianceActionPlanRealtimeRoutes(
  controller: ComplianceActionPlanRealtimeController
): Router {
  const router = Router();

  router.post('/compliance-action-plan/event', serviceAuth, controller.handleActionPlanEvent);
  router.post(
    '/compliance-action-plan/backup-completed',
    serviceAuth,
    controller.handleExportCompleted
  );
  router.post(
    '/compliance-action-plan/report-export-completed',
    serviceAuth,
    controller.handleReportExportCompleted
  );
  router.post('/compliance-action-plan-task/event', serviceAuth, controller.handleTaskEvent);
  router.post(
    '/compliance-action-plan-task-comment/event',
    serviceAuth,
    controller.handleTaskCommentEvent
  );

  return router;
}

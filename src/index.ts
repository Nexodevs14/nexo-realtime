import http from 'http';
import type { Server as HttpServer } from 'http';
import { createApp } from '@/app';
import { env } from '@/config/env';
import { initSocketIo } from '@/infrastructure/socket-io.server';
import { SocketIoGateway } from '@/infrastructure/socket-io.gateway';
import { JwtSocketAuthenticator } from '@/infrastructure/jwt-socket-authenticator';
import { LegalBasisExportNotifier } from '@/services/legal-basis-export-notifier';
import { LegalBasisRealtimeController } from '@/controllers/legal-basis-realtime.controller';
import { createLegalBasisRealtimeRoutes } from '@/routes/legal-basis-realtime.routes';
import { NotificationRealtimeNotifier } from '@/services/notification-realtime-notifier';
import { NotificationRealtimeController } from '@/controllers/notification-realtime.controller';
import { createNotificationRealtimeRoutes } from '@/routes/notification-realtime.routes';
import { FormDuplicatedNotifier } from '@/services/form-duplicated-notifier';
import { FormRealtimeController } from '@/controllers/form-realtime.controller';
import { createFormRealtimeRoutes } from '@/routes/form-realtime.routes';
import { AuditProcessNotifier } from '@/services/audit-process-notifier';
import { AuditProcessRealtimeController } from '@/controllers/audit-process-realtime.controller';
import { createAuditProcessRealtimeRoutes } from '@/routes/audit-process-realtime.routes';
import { AuditExecutionNotifier } from '@/services/audit-execution-notifier';
import { AuditExecutionRealtimeController } from '@/controllers/audit-execution-realtime.controller';
import { createAuditExecutionRealtimeRoutes } from '@/routes/audit-execution-realtime.routes';
import { ConditionalNotifier } from '@/services/conditional-notifier';
import { ConditionalRealtimeController } from '@/controllers/conditional-realtime.controller';
import { createConditionalRealtimeRoutes } from '@/routes/conditional-realtime.routes';
import { AuditApplicabilityNotifier } from '@/services/audit-applicability-notifier';
import { AuditApplicabilityRealtimeController } from '@/controllers/audit-applicability-realtime.controller';
import { createAuditApplicabilityRealtimeRoutes } from '@/routes/audit-applicability-realtime.routes';
import { AuditApplicabilityExportNotifier } from '@/services/audit-applicability-export-notifier';
import { ComplianceExecutionExportNotifier } from '@/services/compliance-execution-export-notifier';
import { ComplianceExecutionRealtimeNotifier } from '@/services/compliance-execution-realtime-notifier';
import { ComplianceExecutionRealtimeController } from '@/controllers/compliance-execution-realtime.controller';
import { createComplianceExecutionRealtimeRoutes } from '@/routes/compliance-execution-realtime.routes';
import { ComplianceActionPlanExportNotifier } from '@/services/action-plan-export-notifier';
import { ComplianceActionPlanRealtimeNotifier } from '@/services/action-plan-realtime-notifier';
import { ComplianceActionPlanRealtimeController } from '@/controllers/action-plan-realtime.controller';
import { createComplianceActionPlanRealtimeRoutes } from '@/routes/action-plan-realtime.routes';
import { ConditionalActionPlanRealtimeNotifier } from '@/services/conditional-action-plan-realtime-notifier';
import { ConditionalActionPlanRealtimeController } from '@/controllers/conditional-action-plan-realtime.controller';
import { createConditionalActionPlanRealtimeRoutes } from '@/routes/conditional-action-plan-realtime.routes';
import { notFoundHandler } from '@/middlewares/not-found.middleware';
import { errorHandler } from '@/middlewares/error-handler';

/**
 * --------------------------------------------------------------------------
 * Application Bootstrap (Composition Root)
 * --------------------------------------------------------------------------
 *
 * This file is the ONLY place where:
 * - Infrastructure is initialized
 * - Concrete implementations are wired together
 * - The application lifecycle is controlled
 *
 * No business logic should live here.
 */

async function bootstrap(): Promise<void> {
  /**
   * ------------------------------------------------------------------------
   * Express App
   * ------------------------------------------------------------------------
   */
  const app = createApp();

  /**
   * ------------------------------------------------------------------------
   * HTTP Server
   * ------------------------------------------------------------------------
   */
  const server: HttpServer = http.createServer(app);

  /**
   * ------------------------------------------------------------------------
   * Socket.IO Infrastructure
   * ------------------------------------------------------------------------
   */
  const socketAuthenticator = new JwtSocketAuthenticator();
  const io = await initSocketIo(server, socketAuthenticator);
  const realtimeGateway = new SocketIoGateway(io);

  /**
   * ------------------------------------------------------------------------
   * Domain Services
   * ------------------------------------------------------------------------
   */
  const legalBasisNotifier = new LegalBasisExportNotifier(realtimeGateway);
  const notificationNotifier = new NotificationRealtimeNotifier(realtimeGateway);
  const formDuplicatedNotifier = new FormDuplicatedNotifier(realtimeGateway);
  const auditProcessNotifier = new AuditProcessNotifier(realtimeGateway);
  const auditExecutionNotifier = new AuditExecutionNotifier(realtimeGateway);
  const conditionalNotifier = new ConditionalNotifier(realtimeGateway);
  const auditApplicabilityNotifier = new AuditApplicabilityNotifier(realtimeGateway);
  const auditApplicabilityExportNotifier = new AuditApplicabilityExportNotifier(realtimeGateway);
  const complianceExecutionExportNotifier = new ComplianceExecutionExportNotifier(realtimeGateway);
  const complianceExecutionRealtimeNotifier = new ComplianceExecutionRealtimeNotifier(
    realtimeGateway
  );
  const complianceActionPlanRealtimeNotifier = new ComplianceActionPlanRealtimeNotifier(
    realtimeGateway
  );
  const complianceActionPlanExportNotifier = new ComplianceActionPlanExportNotifier(
    realtimeGateway
  );
  const conditionalActionPlanRealtimeNotifier = new ConditionalActionPlanRealtimeNotifier(
    realtimeGateway
  );

  /**
   * ------------------------------------------------------------------------
   * Controllers
   * ------------------------------------------------------------------------
   */
  const legalBasisRealtimeController = new LegalBasisRealtimeController(legalBasisNotifier);

  const notificationRealtimeController = new NotificationRealtimeController(notificationNotifier);

  const formRealtimeController = new FormRealtimeController(formDuplicatedNotifier);

  const auditProcessRealtimeController = new AuditProcessRealtimeController(auditProcessNotifier);
  const auditExecutionRealtimeController = new AuditExecutionRealtimeController(
    auditExecutionNotifier
  );
  const conditionalRealtimeController = new ConditionalRealtimeController(conditionalNotifier);
  const auditApplicabilityRealtimeController = new AuditApplicabilityRealtimeController(
    auditApplicabilityNotifier,
    auditApplicabilityExportNotifier
  );
  const complianceExecutionRealtimeController = new ComplianceExecutionRealtimeController(
    complianceExecutionRealtimeNotifier,
    complianceExecutionExportNotifier
  );
  const complianceActionPlanRealtimeController = new ComplianceActionPlanRealtimeController(
    complianceActionPlanRealtimeNotifier,
    complianceActionPlanExportNotifier
  );
  const conditionalActionPlanRealtimeController = new ConditionalActionPlanRealtimeController(
    conditionalActionPlanRealtimeNotifier
  );

  /**
   * ------------------------------------------------------------------------
   * Routes
   * ------------------------------------------------------------------------
   */
  app.use('/api/v1/realtime', createLegalBasisRealtimeRoutes(legalBasisRealtimeController));

  app.use('/api/v1/realtime', createNotificationRealtimeRoutes(notificationRealtimeController));

  app.use('/api/v1/realtime', createFormRealtimeRoutes(formRealtimeController));

  app.use('/api/v1/realtime', createAuditProcessRealtimeRoutes(auditProcessRealtimeController));

  app.use('/api/v1/realtime', createAuditExecutionRealtimeRoutes(auditExecutionRealtimeController));

  app.use('/api/v1/realtime', createConditionalRealtimeRoutes(conditionalRealtimeController));

  app.use(
    '/api/v1/realtime',
    createAuditApplicabilityRealtimeRoutes(auditApplicabilityRealtimeController)
  );

  app.use(
    '/api/v1/realtime',
    createComplianceExecutionRealtimeRoutes(complianceExecutionRealtimeController)
  );

  app.use(
    '/api/v1/realtime',
    createComplianceActionPlanRealtimeRoutes(complianceActionPlanRealtimeController)
  );

  app.use(
    '/api/v1/realtime',
    createConditionalActionPlanRealtimeRoutes(conditionalActionPlanRealtimeController)
  );

  /**
   * ------------------------------------------------------------------------
   * Health Check
   * ------------------------------------------------------------------------
   */
  app.get('/api/v1/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  /**
   * ------------------------------------------------------------------------
   * Global Middlewares
   * ------------------------------------------------------------------------
   */
  app.use(notFoundHandler);
  app.use(errorHandler);

  /**
   * ------------------------------------------------------------------------
   * Start Server
   * ------------------------------------------------------------------------
   */
  server.listen(env.port, () => {
    console.log(`🚀 ${env.appName} running on ${env.appUrl}:${env.port} (${env.nodeEnv})`);
  });

  /**
   * ------------------------------------------------------------------------
   * Graceful Shutdown
   * ------------------------------------------------------------------------
   */
  const shutdown = (signal: string): void => {
    console.log(`🛑 ${signal} received. Shutting down server...`);

    server.close(() => {
      console.log('✅ HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

/**
 * Bootstrap execution
 */
bootstrap().catch((error) => {
  console.error('❌ Failed to bootstrap application', error);
  process.exit(1);
});

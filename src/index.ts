import http from "http";
import type { Server as HttpServer } from "http";
import { createApp } from "@/app";
import { env } from "@/config/env";
import { initSocketIo } from "@/infrastructure/socket-io.server";
import { SocketIoGateway } from "@/infrastructure/socket-io.gateway";
import { JwtSocketAuthenticator } from "@/infrastructure/jwt-socket-authenticator";
import { LegalBasisExportNotifier } from "@/services/legal-basis-export-notifier";
import { LegalBasisRealtimeController } from "@/controllers/legal-basis-realtime.controller";
import { createLegalBasisRealtimeRoutes } from "@/routes/legal-basis-realtime.routes";
import { NotificationRealtimeNotifier } from "@/services/notification-realtime-notifier";
import { NotificationRealtimeController } from "@/controllers/notification-realtime.controller";
import { createNotificationRealtimeRoutes } from "@/routes/notification-realtime.routes";
import { FormDuplicatedNotifier } from "@/services/form-duplicated-notifier";
import { FormRealtimeController } from "@/controllers/form-realtime.controller";
import { createFormRealtimeRoutes } from "@/routes/form-realtime.routes";
import { notFoundHandler } from "@/middlewares/not-found.middleware";
import { errorHandler } from "@/middlewares/error-handler";

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
  const notificationNotifier = new NotificationRealtimeNotifier(
    realtimeGateway
  );
  const formDuplicatedNotifier = new FormDuplicatedNotifier(realtimeGateway);

  /**
   * ------------------------------------------------------------------------
   * Controllers
   * ------------------------------------------------------------------------
   */
  const legalBasisRealtimeController = new LegalBasisRealtimeController(
    legalBasisNotifier
  );

  const notificationRealtimeController = new NotificationRealtimeController(
    notificationNotifier
  );

  const formRealtimeController = new FormRealtimeController(
    formDuplicatedNotifier
  );

  /**
   * ------------------------------------------------------------------------
   * Routes
   * ------------------------------------------------------------------------
   */
  app.use(
    "/api/v1/realtime",
    createLegalBasisRealtimeRoutes(legalBasisRealtimeController)
  );

  app.use(
    "/api/v1/realtime",
    createNotificationRealtimeRoutes(notificationRealtimeController)
  );

  app.use(
    "/api/v1/realtime",
    createFormRealtimeRoutes(formRealtimeController)
  );
  
  /**
   * ------------------------------------------------------------------------
   * Health Check
   * ------------------------------------------------------------------------
   */
  app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
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
    console.log(
      `🚀 ${env.appName} running on ${env.appUrl}:${env.port} (${env.nodeEnv})`
    );
  });

  /**
   * ------------------------------------------------------------------------
   * Graceful Shutdown
   * ------------------------------------------------------------------------
   */
  const shutdown = (signal: string): void => {
    console.log(`🛑 ${signal} received. Shutting down server...`);

    server.close(() => {
      console.log("✅ HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

/**
 * Bootstrap execution
 */
bootstrap().catch((error) => {
  console.error("❌ Failed to bootstrap application", error);
  process.exit(1);
});

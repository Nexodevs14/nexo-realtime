import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from '@/config/env';

/**
 * Creates and configures the Express application.
 *
 * This function is responsible for:
 * - Applying global security middlewares
 * - Configuring CORS
 * - Parsing JSON payloads
 * - Registering base/system routes
 *
 *
 * @returns {Application} Configured Express application
 */
export function createApp(): Application {
  const app: Application = express();

  /**
   * --------------------------------------------------------------------------
   * Security Middleware
   * --------------------------------------------------------------------------
   *
   * helmet() helps secure the app by setting various HTTP headers.
   * This is a baseline security requirement for production services.
   */
  app.use(helmet());

  /**
   * --------------------------------------------------------------------------
   * CORS Configuration
   * --------------------------------------------------------------------------
   *
   * Allows requests only from the configured frontend origin.
   * Credentials are enabled to support cookies / auth headers if needed.
   */
  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true,
    })
  );

  /**
   * --------------------------------------------------------------------------
   * Body Parsing
   * --------------------------------------------------------------------------
   *
   * Limits JSON payload size to prevent abuse.
   */
  app.use(express.json());

  return app;
}

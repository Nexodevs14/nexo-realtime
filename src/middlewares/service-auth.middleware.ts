import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "@/errors/api.errors";
import { env } from "@/config/env";

/**
 * Service-to-service authentication middleware.
 *
 * Ensures that requests come from trusted backend services
 * (e.g. Laravel API).
 */
export function serviceAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Missing Authorization header");
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || token !== env.serviceToken) {
    throw new UnauthorizedError("Invalid service token");
  }

  next();
}

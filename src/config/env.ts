import dotenv from 'dotenv';
import { NodeEnv, EnvConfig } from '@/types/env.types';
import { UnexpectedError } from '@/errors/api.errors';

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * Ensures an env variable exists
 *
 * @param name - The name of the environment variable
 * @returns The value of the environment variable
 */
function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new UnexpectedError(`Missing environment variable: ${name}`);
  }

  return value;
}

/**
 * Centralized, typed environment configuration
 */
export const env: EnvConfig = {
  appName: required('APP_NAME'),
  appUrl: required('APP_URL'),
  nodeEnv: required('NODE_ENV') as NodeEnv,
  port: Number(required('PORT')),
  corsOrigin: required('CORS_ORIGIN'),
  jwtPublicKey: required('JWT_PUBLIC_KEY'),
  serviceToken: required('SERVICE_TOKEN'),
  redisUrl: required('REDIS_URL'),
} as const;

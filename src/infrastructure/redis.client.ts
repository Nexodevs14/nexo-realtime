import { createClient, type RedisClientType } from 'redis';
import { env } from '@/config/env';

/**
 * Redis Client
 */
export const redisClient: RedisClientType = createClient({
  url: env.redisUrl,
});

/*
 * Redis Client Events
 */

/**
 * Event to indicate that the Redis client is ready
 */
redisClient.on('ready', () => {
  console.log('Redis Client Connected');
});

/**
 * Event to indicate that the Redis client has encountered an error
 */
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

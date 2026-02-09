// src/infrastructure/socket-io.redis-adapter.ts
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { env } from '@/config/env';

/**
 * Creates a Socket.IO Redis adapter.
 *
 * Uses Pub/Sub Redis clients internally.
 */
export async function createRedisAdapter() {
  const pubClient = createClient({ url: env.redisUrl });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);

  return createAdapter(pubClient, subClient);
}

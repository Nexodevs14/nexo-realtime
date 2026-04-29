import { Server, Socket } from 'socket.io';
import { SocketAuthenticator } from '@/interfaces/socket-authenticator';
import { createRedisAdapter } from '@/infrastructure/socket-io.redis-adapter';
import type { Server as HttpServer } from 'http';
import { env } from '@/config/env';
import { UnauthorizedError, UnexpectedError } from '@/errors/api.errors';

/**
 * Socket.IO Server Bootstrap
 * --------------------------------------------------------------------------
 *
 * Responsible for creating and configuring the Socket.IO server.
 * This module guarantees a single instance during application lifecycle.
 */

let io: Server | null = null;

/**
 * Initializes the Socket.IO server.
 *
 * @param httpServer - Node HTTP server
 * @returns Socket.IO server instance
 */
export async function initSocketIo(
  httpServer: HttpServer,
  authenticator: SocketAuthenticator
): Promise<Server> {
  if (io) return io;

  io = new Server(httpServer, {
    cors: {
      origin: env.corsOrigin,
      credentials: true,
    },
  });

  const adapter = await createRedisAdapter();
  io.adapter(adapter);
  io.use(async (socket, next) => {
    try {
      const userId = await authenticator.authenticate(socket.handshake.auth);
      socket.data.userId = userId;
      next();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return next(error);
      }
      next(new UnexpectedError('Socket authentication failed'));
    }
  });
  registerConnectionHandlers(io);
  return io;
}

/**
 * Returns the active Socket.IO server instance.
 *
 * @throws Error if Socket.IO has not been initialized
 */
export function getSocketIo(): Server {
  if (!io) {
    throw new UnexpectedError('Socket.IO has not been initialized');
  }

  return io;
}

/**
 * Registers base connection handlers.
 *
 * @param io - Socket.IO server
 */
function registerConnectionHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    const userId = socket.data.userId;
    if (!userId) {
      socket.disconnect(true);
      return;
    }
    const userRoom = buildUserRoom(userId);
    socket.join(userRoom);
    socket.on(
      'join-context',
      (payload: { clientSessionId?: string; customerId?: number; corporateIds?: number[] }) => {
        joinClientSessionRoom(socket, payload.clientSessionId);
        joinCustomerRoom(socket, payload.customerId);
        joinCorporateRooms(socket, payload.corporateIds);
      }
    );
    socket.on('disconnect', () => {
      socket.leave(userRoom);
    });
  });
}

/**
 * Builds the user room name.
 *
 * @param userId - The user ID
 * @returns The user room name
 */
function buildUserRoom(userId: string | number): string {
  return `user:${userId}`;
}

/**
 * Builds the client session room name.
 *
 * @param clientSessionId - The client session identifier
 * @returns The client session room name
 */
function buildClientSessionRoom(clientSessionId: string): string {
  return `client-session:${clientSessionId}`;
}

/**
 * Joins the socket to the client session room.
 *
 * @param socket - The Socket.IO socket
 * @param clientSessionId - The client session identifier
 */
function joinClientSessionRoom(socket: Socket, clientSessionId?: string): void {
  if (!clientSessionId) return;

  socket.join(buildClientSessionRoom(clientSessionId));
}

/**
 * Joins the socket to the customer room.
 *
 * @param socket - The Socket.IO socket
 * @param customerId - The customer ID
 */
function joinCustomerRoom(socket: Socket, customerId?: number): void {
  if (!customerId) return;

  const room = `customer:${customerId}`;
  socket.join(room);
}

/**
 * Joins the socket to the corporate rooms.
 *
 * @param socket - The Socket.IO socket
 * @param corporateIds - The array of corporate IDs
 */
function joinCorporateRooms(socket: Socket, corporateIds?: number[]): void {
  if (!Array.isArray(corporateIds)) return;

  for (const corporateId of corporateIds) {
    socket.join(`corporate:${corporateId}`);
  }
}

import type { Server } from 'socket.io';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { RealtimeEventEnum } from '@/enums/realtime-events';

/**
 * SocketIoGateway
 * --------------------------------------------------------------------------
 *
 * Concrete implementation of the RealtimeGateway interface using Socket.IO.
 *
 * This class is part of the infrastructure layer and is responsible for:
 * - Emitting real-time events to connected users
 * - Abstracting Socket.IO details from the domain layer
 *
 */
export class SocketIoGateway implements RealtimeGateway {
  /**
   * Creates an instance of SocketIoGateway.
   *
   * @param io - Socket.IO server instance
   */
  constructor(private readonly io: Server) {}

  /**
   * @inheritdoc
   */
  emitToUser<T>(userId: number, event: RealtimeEventEnum, payload: T): void {
    const room = this.getUserRoom(userId);
    this.io.to(room).emit(event, payload);
  }

  /**
   * @inheritdoc
   */
  broadcast<T>(event: RealtimeEventEnum, payload: T): void {
    this.io.emit(event, payload);
  }

  /**
   * @inheritdoc
   */
  broadcastToRoom<T>(room: string, event: string, payload: T): void {
    this.io.to(room).emit(event, payload);
  }

  broadcastToRoomExceptUser<T>(room: string, userId: number, event: string, payload: T): void {
    const userRoom = `user:${userId}`;
    this.io.to(room).except(userRoom).emit(event, payload);
  }

  /**
   * Builds the Socket.IO room name for a given user.
   *
   * Centralizing this logic ensures:
   * - Consistent room naming
   * - Easy refactoring if the strategy changes
   *
   * @param userId - User identifier
   * @returns Room name
   */
  private getUserRoom(userId: string | number): string {
    return `user:${userId}`;
  }
}

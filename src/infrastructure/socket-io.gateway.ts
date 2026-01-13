import type { Server } from "socket.io";
import { RealtimeGateway } from "@/interfaces/realtime-gateway";
import { RealtimeEventEnum } from "@/enums/realtime-events";

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
   * Emits a real-time event to a specific user.
   *
   * Users are addressed via a deterministic room name:
   * `user:{userId}`
   *
   * This allows:
   * - Multiple connections per user
   * - Horizontal scaling (with adapters like Redis later)
   *
   * @template T - Payload type
   * @param userId - Unique identifier of the target user
   * @param event - Realtime event name
   * @param payload - Data associated with the event
   */
  emitToUser<T>(
    userId: number,
    event: RealtimeEventEnum,
    payload: T
  ): void {
    const room = this.getUserRoom(userId);
    this.io.to(room).emit(event, payload);
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

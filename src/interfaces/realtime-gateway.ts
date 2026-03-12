/**
 * Contract for real-time communication adapters.
 * Transport-agnostic.
 */
export interface RealtimeGateway {
  /**
   * Emit an event to a specific user.
   *
   * @param userId - The ID of the user to emit the event to.
   * @param event - The name of the event to emit.
   * @param payload - The data to include in the event.
   */
  emitToUser<T>(userId: number, event: string, payload: T): void;

  /**
   *
   * Emit an event to all connected clients.
   * @param event - The name of the event to emit.
   * @param payload - The data to include in the event.
   */
  broadcast<T>(event: string, payload: T): void;

  /**   * Emit an event to all clients in a specific room.
   *
   * @param room - The room to which the event should be broadcasted.
   * @param event - The name of the event to emit.
   * @param payload - The data to include in the event.
   */
  broadcastToRoom<T>(room: string, event: string, payload: T): void;

  /**   * Emit an event to all clients in a specific room except a specific user.
   *
   * @param room - The room to which the event should be broadcasted.
   * @param userId - The ID of the user to exclude from receiving the event.
   * @param event - The name of the event to emit.
   * @param payload - The data to include in the event.
   */
  broadcastToRoomExceptUser<T>(room: string, userId: number, event: string, payload: T): void;
}

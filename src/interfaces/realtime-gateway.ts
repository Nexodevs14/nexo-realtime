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
}

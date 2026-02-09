/**
 * Generic domain notifier contract.
 *
 * Represents a use case that triggers a side-effect
 * (real-time event, email, push, etc.).
 */
export interface Notifier<TPayload> {
  /**
   * Notify about an event.
   *
   * @param payload - The data to include in the notification.
   */
  notify(payload: TPayload): void;
}

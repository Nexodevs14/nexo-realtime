import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { NotificationChangePayload } from '@/validators/notification-realtime.validators';

/**
 * Emits realtime notification update signals.
 */
export class NotificationRealtimeNotifier implements Notifier<NotificationChangePayload> {
  /**
   * NotificationRealtimeNotifier constructor
   *
   * @param realtimeGateway Realtime gateway implementation
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notify user about notification changes.
   */
  notify(payload: NotificationChangePayload): void {
    this.realtimeGateway.emitToUser(payload.userId, RealtimeEventEnum.NOTIFICATIONS_UPDATED, {
      action: payload.action,
    });
  }
}

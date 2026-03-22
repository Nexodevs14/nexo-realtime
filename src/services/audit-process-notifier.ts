import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditProcessPayload } from '@/validators/audit-process.validators';
import { AuditProcessEventType } from '@/types/audit-process.types';

/**
 * Handles realtime notification for Audit Process events.
 */
export class AuditProcessNotifier implements Notifier<AuditProcessPayload> {
  /**
   * Creates an instance of AuditProcessNotifier.
   *
   * @param realtimeGateway - The RealtimeGateway instance to use for notifications.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies clients about an Audit Process event.
   */
  notify(payload: AuditProcessPayload): void {
    const event = this.mapEvent(payload.event);
    if (payload.corporateIds.length > 0) {
      for (const corporateId of payload.corporateIds) {
        const room = `corporate:${corporateId}`;
        this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      }

      return;
    }

    const room = `customer:${payload.customerId}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
  }

  /**
   * Maps AuditProcessEventType to RealtimeEventEnum.
   */
  private mapEvent(type: AuditProcessEventType): RealtimeEventEnum {
    const map: Record<AuditProcessEventType, RealtimeEventEnum> = {
      [AuditProcessEventType.CREATED]: RealtimeEventEnum.AUDIT_PROCESS_CREATED,
      [AuditProcessEventType.UPDATED]: RealtimeEventEnum.AUDIT_PROCESS_UPDATED,
      [AuditProcessEventType.STATUS_CHANGED]: RealtimeEventEnum.AUDIT_PROCESS_STATUS_CHANGED,
      [AuditProcessEventType.DELETED]: RealtimeEventEnum.AUDIT_PROCESS_DELETED,
    };

    return map[type];
  }
}

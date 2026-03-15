import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditExecutionPayload } from '@/validators/audit-execution.validators';
import { AuditExecutionEventType } from '@/types/audit-execution.types';

/**
 * Handles realtime notification for Audit Execution events.
 * Always emits to corporate:{idCorporate}; idCorporate is required in payload.
 */
export class AuditExecutionNotifier implements Notifier<AuditExecutionPayload> {
  /**
   * Creates an instance of AuditExecutionNotifier.
   *
   * @param realtimeGateway - The RealtimeGateway instance to use for notifications.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies clients about an Audit Execution event.
   */
  notify(payload: AuditExecutionPayload): void {
    const event = this.mapEvent(payload.event);
    const room = `corporate:${payload.idCorporate}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
  }

  /**
   * Maps AuditExecutionEventType to RealtimeEventEnum.
   */
  private mapEvent(type: AuditExecutionEventType): RealtimeEventEnum {
    const map: Record<AuditExecutionEventType, RealtimeEventEnum> = {
      [AuditExecutionEventType.CREATED]: RealtimeEventEnum.AUDIT_EXECUTION_CREATED,
      [AuditExecutionEventType.UPDATED]: RealtimeEventEnum.AUDIT_EXECUTION_UPDATED,
      [AuditExecutionEventType.STATUS_CHANGED]: RealtimeEventEnum.AUDIT_EXECUTION_STATUS_CHANGED,
      [AuditExecutionEventType.DELETED]: RealtimeEventEnum.AUDIT_EXECUTION_DELETED,
    };

    return map[type];
  }
}

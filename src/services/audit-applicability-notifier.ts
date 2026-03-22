import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditApplicabilityPayload } from '@/validators/audit-applicability.validators';
import { AuditApplicabilityEventType } from '@/types/audit-applicability.types';

/**
 * Handles realtime notification for Audit Applicability events.
 * Always emits to corporate:{idCorporate}; if corporateId is null, falls back to customer:{idCustomer}.
 */
export class AuditApplicabilityNotifier implements Notifier<AuditApplicabilityPayload> {
  /**
   * Creates an instance of AuditApplicabilityNotifier.
   *
   * @param realtimeGateway - The RealtimeGateway instance to use for notifications.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies clients about an Audit Applicability event.
   */
  notify(payload: AuditApplicabilityPayload): void {
    const event = this.mapEvent(payload.event);

    if (payload.corporateId !== null) {
      const room = `corporate:${payload.corporateId}`;
      this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      return;
    }

    const room = `customer:${payload.customerId}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
  }

  /**
   * Maps AuditApplicabilityEventType to RealtimeEventEnum.
   */
  private mapEvent(type: AuditApplicabilityEventType): RealtimeEventEnum {
    const map: Record<AuditApplicabilityEventType, RealtimeEventEnum> = {
      [AuditApplicabilityEventType.STARTED]: RealtimeEventEnum.AUDIT_APPLICABILITY_STARTED,
      [AuditApplicabilityEventType.STATUS_CHANGED]:
        RealtimeEventEnum.AUDIT_APPLICABILITY_STATUS_CHANGED,
    };

    return map[type];
  }
}

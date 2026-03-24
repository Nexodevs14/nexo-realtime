import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditApplicabilityAspectPayload } from '@/validators/audit-applicability-aspect.validators';
import { AuditApplicabilityAspectEventType } from '@/types/audit-applicability-aspect.types';

/**
 * Handles realtime notification for Audit Applicability Aspect events.
 *
 * Broadcast strategy:
 * - If corporateId is present, emits to room: corporate:{corporateId}
 * - Otherwise, falls back to room: customer:{customerId}
 *
 * The actor user is excluded from the broadcast.
 */
export class AuditApplicabilityAspectNotifier implements Notifier<AuditApplicabilityAspectPayload> {
  /**
   * Creates an instance of AuditApplicabilityAspectNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies subscribed clients about an Audit Applicability Aspect event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notify(payload: AuditApplicabilityAspectPayload): void {
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
   * Maps Audit Applicability Aspect event types to websocket event names.
   *
   * @param type - Domain event type received from the backend.
   * @returns Realtime event enum used by the websocket gateway.
   */
  private mapEvent(type: AuditApplicabilityAspectEventType): RealtimeEventEnum {
    const map: Record<AuditApplicabilityAspectEventType, RealtimeEventEnum> = {
      [AuditApplicabilityAspectEventType.STATUS_CHANGED]:
        RealtimeEventEnum.AUDIT_APPLICABILITY_ASPECT_STATUS_CHANGED,
      [AuditApplicabilityAspectEventType.UPDATED]:
        RealtimeEventEnum.AUDIT_APPLICABILITY_ASPECT_UPDATED,
    };

    return map[type];
  }
}

import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import {
  AuditApplicabilityAspectPayload,
  AuditApplicabilityPayload,
} from '@/validators/audit-applicability.validators';
import { ScopedRealtimeAudienceNotifier } from '@/services/scoped-realtime-audience-notifier';
import {
  AuditApplicabilityAspectEventType,
  AuditApplicabilityEventType,
} from '@/types/audit-applicability.types';

/**
 * Handles realtime notification for Audit Applicability events.
 * Always emits to corporate:{idCorporate}; if corporateId is null, falls back to customer:{idCustomer}.
 */
export class AuditApplicabilityNotifier implements Notifier<AuditApplicabilityPayload> {
  private readonly audienceNotifier: ScopedRealtimeAudienceNotifier;

  /**
   * Creates an instance of AuditApplicabilityNotifier.
   *
   * @param realtimeGateway - The RealtimeGateway instance to use for notifications.
   */
  constructor(realtimeGateway: RealtimeGateway) {
    this.audienceNotifier = new ScopedRealtimeAudienceNotifier(realtimeGateway);
  }

  /**
   * Notifies clients about an Audit Applicability event.
   */
  notify(payload: AuditApplicabilityPayload): void {
    const event = this.mapEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies clients about an Audit Applicability Aspect event.
   */
  notifyAspect(payload: AuditApplicabilityAspectPayload): void {
    const event = this.mapAspectEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Maps AuditApplicabilityEventType to RealtimeEventEnum.
   */
  private mapEvent(type: AuditApplicabilityEventType): RealtimeEventEnum {
    const map: Record<AuditApplicabilityEventType, RealtimeEventEnum> = {
      [AuditApplicabilityEventType.STARTED]: RealtimeEventEnum.AUDIT_APPLICABILITY_STARTED,
      [AuditApplicabilityEventType.STATUS_CHANGED]:
        RealtimeEventEnum.AUDIT_APPLICABILITY_STATUS_CHANGED,
      [AuditApplicabilityEventType.COMPLETED]: RealtimeEventEnum.AUDIT_APPLICABILITY_COMPLETED,
    };

    return map[type];
  }

  /**
   * Maps AuditApplicabilityAspectEventType to RealtimeEventEnum.
   */
  private mapAspectEvent(type: AuditApplicabilityAspectEventType): RealtimeEventEnum {
    const map: Record<AuditApplicabilityAspectEventType, RealtimeEventEnum> = {
      [AuditApplicabilityAspectEventType.STATUS_CHANGED]:
        RealtimeEventEnum.AUDIT_APPLICABILITY_ASPECT_STATUS_CHANGED,
      [AuditApplicabilityAspectEventType.UPDATED]:
        RealtimeEventEnum.AUDIT_APPLICABILITY_ASPECT_UPDATED,
    };

    return map[type];
  }
}

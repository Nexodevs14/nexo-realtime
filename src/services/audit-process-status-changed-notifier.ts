import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditProcessPayload } from '@/validators/audit-process.validators';

/**
 * Handles realtime notification when an Audit Process status changes.
 */
export class AuditProcessStatusChangedNotifier implements Notifier<AuditProcessPayload> {
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies clients that an Audit Process status has changed.
   */
  notify(payload: AuditProcessPayload): void {
    for (const corporateId of payload.corporateIds) {
      const room = `corporate:${corporateId}`;

      this.realtimeGateway.broadcastToRoomExceptUser(
        room,
        payload.actorId,
        RealtimeEventEnum.AUDIT_PROCESS_CREATED,
        payload
      );
    }
  }
}

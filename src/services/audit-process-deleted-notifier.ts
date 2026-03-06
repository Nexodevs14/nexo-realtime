import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditProcessPayload } from '@/validators/audit-process.validators';

/**
 * Handles realtime notification when an Audit Process is deleted.
 */
export class AuditProcessDeletedNotifier implements Notifier<AuditProcessPayload> {
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies clients that an Audit Process has been deleted.
   */
  notify(payload: AuditProcessPayload): void {
    for (const corporateId of payload.corporateIds) {
      const room = `corporate:${corporateId}`;
      this.realtimeGateway.broadcastToRoom(room, RealtimeEventEnum.AUDIT_PROCESS_DELETED, payload);
    }
  }
}

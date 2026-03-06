import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditProcessPayload } from '@/validators/audit-process.validators';

/**
 * Handles realtime notification when an Audit Process is created.
 */
export class AuditProcessCreatedNotifier implements Notifier<AuditProcessPayload> {
  /**
   * Creates an instance of AuditProcessCreatedNotifier.
   *
   * @param realtimeGateway - The RealtimeGateway instance to use for notifications.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies clients that a new Audit Process has been created.
   */
  notify(payload: AuditProcessPayload): void {
    for (const corporateId of payload.corporateIds) {
      const room = `corporate:${corporateId}`;

      this.realtimeGateway.broadcastToRoom(room, RealtimeEventEnum.AUDIT_PROCESS_CREATED, payload);
    }
  }
}

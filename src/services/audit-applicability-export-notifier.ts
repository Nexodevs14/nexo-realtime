import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { AuditApplicabilityExportCompletedPayload } from '@/validators/audit-applicability.validators';

/**
 * Class AuditApplicabilityExportNotifier
 *
 * Handles realtime notification when an audit applicability export
 * has been completed.
 *
 * Emits a socket event directly to the user.
 */
export class AuditApplicabilityExportNotifier implements Notifier<AuditApplicabilityExportCompletedPayload> {
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notify user via realtime socket.
   */
  notify(payload: AuditApplicabilityExportCompletedPayload): void {
    this.realtimeGateway.emitToClientSession(
      payload.clientSessionId,
      RealtimeEventEnum.AUDIT_APPLICABILITY_EXPORT_COMPLETED,
      payload
    );
  }
}

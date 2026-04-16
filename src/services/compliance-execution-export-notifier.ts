import { RealtimeEventEnum } from '@/enums/realtime-events';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { ComplianceExecutionExportCompletedPayload } from '@/validators/compliance-execution.validators';

/**
 * Handles notification logic when a Compliance Execution export is completed.
 */
export class ComplianceExecutionExportNotifier implements Notifier<ComplianceExecutionExportCompletedPayload> {
  /**
   * Creates an instance of ComplianceExecutionExportNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies the target user when a Compliance Execution export has finished.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notify(payload: ComplianceExecutionExportCompletedPayload): void {
    this.realtimeGateway.emitToUser(
      payload.userId,
      RealtimeEventEnum.COMPLIANCE_EXECUTION_EXPORT_COMPLETED,
      payload
    );
  }
}

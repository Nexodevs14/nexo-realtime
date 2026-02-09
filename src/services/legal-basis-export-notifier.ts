import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { LegalBasisExportCompletedPayload } from '@/types/legal-basis-realtime.types';

/**
 * Handles notification logic when a LegalBasis export is completed.
 */
export class LegalBasisExportNotifier implements Notifier<LegalBasisExportCompletedPayload> {
  /**
   * Creates an instance of LegalBasisExportNotifier.
   * @param realtimeGateway - The RealtimeGateway instance to use for notifications.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies the user when a LegalBasis export is completed.
   */
  notify(payload: LegalBasisExportCompletedPayload): void {
    this.realtimeGateway.emitToUser(
      payload.userId,
      RealtimeEventEnum.LEGAL_BASIS_EXPORT_COMPLETED,
      payload
    );
  }
}

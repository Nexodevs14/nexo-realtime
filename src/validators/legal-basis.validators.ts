import { z } from 'zod';

/**
 * Schema for LegalBasis export completed event.
 */
export const LegalBasisExportCompletedSchema = z.object({
  userId: z.number(),
  legalBasisId: z.number(),
  legalBasisName: z.string(),
  fileUrl: z.url(),
  clientSessionId: z.uuid(),
});

/*
 * Payload for the legal_basis.export_completed event.
 */
export type LegalBasisExportCompletedPayload = z.infer<typeof LegalBasisExportCompletedSchema>;

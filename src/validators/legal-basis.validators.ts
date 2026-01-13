import { z } from "zod";

/**
 * Schema for LegalBasis export completed event.
 */
export const LegalBasisExportCompletedSchema = z.object({
  userId: z.number(),
  legalBasisId: z.number(),
  legalBasisName: z.string(),   
  fileUrl: z.url(),
});

/**
 * Inferred TypeScript type from schema.
 */
export type LegalBasisExportCompletedPayload =
  z.infer<typeof LegalBasisExportCompletedSchema>;

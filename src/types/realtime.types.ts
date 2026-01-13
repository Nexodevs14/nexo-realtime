import { z } from "zod";
import { LegalBasisExportCompletedSchema } from "@/validators/legal-basis.validators";

/*
 * Payload for the legal_basis.export_completed event.
 */
export type LegalBasisExportCompletedPayload =
  z.infer<typeof LegalBasisExportCompletedSchema>;
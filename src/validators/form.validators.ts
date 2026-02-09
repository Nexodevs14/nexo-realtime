import { z } from 'zod';

/**
 * Schema for Form duplicated realtime event.
 */
export const FormDuplicatedSchema = z.object({
  original_form_id: z.number(),
  new_form_id: z.number(),
  track_id: z.number(),
  version: z.number(),
});

/**
 * Inferred payload type.
 */
export type FormDuplicatedPayload = z.infer<typeof FormDuplicatedSchema>;

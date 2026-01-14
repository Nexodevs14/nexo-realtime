import { z } from "zod";
import { NotificationChangeType } from "@/types/notification-realtime.types";

/**
 * Schema for notification change events.
 */
export const NotificationChangeSchema = z.object({
  userId: z.number(),
  action: z.enum([
    NotificationChangeType.CREATED,
    NotificationChangeType.READ,
    NotificationChangeType.UPDATED,
    NotificationChangeType.DELETED,
  ]),
});

/**
 * Inferred payload type.
 */
export type NotificationChangePayload =
  z.infer<typeof NotificationChangeSchema>;

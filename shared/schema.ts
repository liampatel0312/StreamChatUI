import { z } from "zod";

// Stream Chat User Authentication Schema
export const streamUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  userToken: z.string().min(1, "User token is required"),
  userName: z.string().optional(),
});

export type StreamUser = z.infer<typeof streamUserSchema>;

// Channel creation schema
export const createChannelSchema = z.object({
  channelId: z.string().min(1, "Channel ID is required"),
  channelName: z.string().min(1, "Channel name is required"),
  channelType: z.enum(["messaging", "team", "livestream"]).default("messaging"),
  members: z.array(z.string()).optional(),
});

export type CreateChannel = z.infer<typeof createChannelSchema>;

import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(1),
  duration: z.string().min(1),
});

export const deleteRoomSchema = z.object({
  id: z.string().min(1),
});

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  createdAt: z.date(),
});

export type IRoom = z.infer<typeof RoomSchema>;

export type deleteRoom = z.infer<typeof deleteRoomSchema>;

export type createRoomFormData = z.infer<typeof createRoomSchema>;

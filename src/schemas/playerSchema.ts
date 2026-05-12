import { z } from "zod"

export const addPlayerSchema = z.object({
  playerId: z.number().int().positive(),
  source: z.enum(["pack", "mission", "objective"]),
})
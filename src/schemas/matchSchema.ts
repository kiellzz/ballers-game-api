import { z } from "zod"

const playerStatSchema = z.object({
  playerId: z.number().int().positive(),
  goals: z.number().int().min(0).default(0),
  assists: z.number().int().min(0).default(0),
  cleanSheet: z.boolean().default(false),
  yellowCards: z.number().int().min(0).max(2).default(0),
  redCard: z.boolean().default(false),
  rating: z.number().min(0).max(10),
  isMVP: z.boolean().default(false),
})

export const createMatchSchema = z.object({
  result: z.enum(["win", "draw", "loss"]),
  goalsFor: z.number().int().min(0),
  goalsAgainst: z.number().int().min(0),
  playerStats: z.array(playerStatSchema).min(1),
})
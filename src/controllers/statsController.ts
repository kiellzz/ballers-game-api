import { Response } from "express"
import { AuthRequest } from "../middlewares/auth"
import * as statsService from "../services/statsService"

export async function getUserStats(req: AuthRequest, res: Response) {
  try {
    const stats = await statsService.getUserStats(req.userId!)
    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
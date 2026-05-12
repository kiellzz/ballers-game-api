import { Response } from "express"
import { AuthRequest } from "../middlewares/auth"
import * as matchService from "../services/matchService"

export async function createMatch(req: AuthRequest, res: Response) {
  try {
    const match = await matchService.createMatch(req.userId!, req.body)
    res.status(201).json(match)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function getMatchHistory(req: AuthRequest, res: Response) {
  try {
    const matches = await matchService.getMatchHistory(req.userId!)
    res.json(matches)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getMatchById(req: AuthRequest, res: Response) {
  try {
    const match = await matchService.getMatchById(req.userId!, Number(req.params.id))
    res.json(match)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
}
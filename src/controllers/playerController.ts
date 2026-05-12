import { Response } from "express"
import { AuthRequest } from "../middlewares/auth"
import * as playerService from "../services/playerService"

export async function getUserPlayers(req: AuthRequest, res: Response) {
  try {
    const players = await playerService.getUserPlayers(req.userId!)
    res.json(players)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function addPlayer(req: AuthRequest, res: Response) {
  try {
    const { playerId, source } = req.body
    const player = await playerService.addPlayer(req.userId!, playerId, source)
    res.status(201).json(player)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function removePlayer(req: AuthRequest, res: Response) {
  try {
    await playerService.removePlayer(req.userId!, Number(req.params.playerId))
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
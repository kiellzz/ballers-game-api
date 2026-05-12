import { Request, Response } from "express"
import * as authService from "../services/authService"

export async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body
    const result = await authService.register(username, password)
    res.status(201).json(result)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body
    const result = await authService.login(username, password)
    res.json(result)
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
}
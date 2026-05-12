import { Request, Response } from "express"
import prisma from "../lib/prisma"

export async function getCoins(req: Request, res: Response) {
  try {
    const userId = (req as any).userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { coins: true },
    })

    if (!user) {
      res.status(404).json({ error: "User not found" })
      return
    }

    res.json({ coins: user.coins })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}
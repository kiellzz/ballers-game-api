import prisma from "../lib/prisma"

const COINS_BY_RESULT: Record<string, number> = {
  win: 150,
  draw: 75,
  loss: 30,
}

export async function createMatch(userId: number, data: {
  result: string
  goalsFor: number
  goalsAgainst: number
  playerStats: {
    playerId: number
    goals: number
    assists: number
    cleanSheet: boolean
    yellowCards: number
    redCard: boolean
    rating: number
    isMVP: boolean
  }[]
}) {
  const coinsEarned = COINS_BY_RESULT[data.result] ?? 0

  const [match] = await prisma.$transaction([
    prisma.match.create({
      data: {
        userId,
        result: data.result,
        goalsFor: data.goalsFor,
        goalsAgainst: data.goalsAgainst,
        coinsEarned,
        playerStats: {
          create: data.playerStats,
        },
      },
      include: { playerStats: true },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { coins: { increment: coinsEarned } },
    }),
  ])

  return match
}

export async function getMatchHistory(userId: number) {
  return prisma.match.findMany({
    where: { userId },
    include: { playerStats: true },
    orderBy: { playedAt: "desc" },
  })
}

export async function getMatchById(userId: number, matchId: number) {
  const match = await prisma.match.findFirst({
    where: { id: matchId, userId },
    include: { playerStats: true },
  })
  if (!match) throw new Error("Match not found")
  return match
}
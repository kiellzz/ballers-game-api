import prisma from "../lib/prisma"

export async function getUserPlayers(userId: number) {
  return prisma.userPlayer.findMany({
    where: { userId },
    orderBy: { acquiredAt: "desc" },
  })
}

export async function addPlayer(userId: number, playerId: number, source: string) {
  const existing = await prisma.userPlayer.findUnique({
    where: { userId_playerId: { userId, playerId } },
  })
  if (existing) throw new Error("Player already in your collection")

  return prisma.userPlayer.create({
    data: { userId, playerId, source },
  })
}

export async function removePlayer(userId: number, playerId: number) {
  const existing = await prisma.userPlayer.findUnique({
    where: { userId_playerId: { userId, playerId } },
  })
  if (!existing) throw new Error("Player not in your collection")

  return prisma.userPlayer.delete({
    where: { userId_playerId: { userId, playerId } },
  })
}
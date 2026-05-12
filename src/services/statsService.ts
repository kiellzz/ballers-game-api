import prisma from "../lib/prisma"

export async function getUserStats(userId: number) {
  const [user, matches] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { coins: true } }),
    prisma.match.findMany({
      where: { userId },
      include: { playerStats: true },
    }),
  ])

  const totalMatches = matches.length
  const wins = matches.filter(m => m.result === "win").length
  const draws = matches.filter(m => m.result === "draw").length
  const losses = matches.filter(m => m.result === "loss").length
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0
  const goalsFor = matches.reduce((acc, m) => acc + m.goalsFor, 0)
  const goalsAgainst = matches.reduce((acc, m) => acc + m.goalsAgainst, 0)

  const allStats = matches.flatMap(m => m.playerStats)
  const totalGoals = allStats.reduce((acc, s) => acc + s.goals, 0)
  const totalAssists = allStats.reduce((acc, s) => acc + s.assists, 0)
  const totalMVPs = allStats.filter(s => s.isMVP).length
  const avgRating = allStats.length > 0
    ? Math.round((allStats.reduce((acc, s) => acc + s.rating, 0) / allStats.length) * 10) / 10
    : 0

  const topScorer = allStats.reduce((top, s) => {
    if (!top || s.goals > top.goals) return s
    return top
  }, allStats[0] || null)

  return {
    coins: user?.coins ?? 0,
    totalMatches,
    wins,
    draws,
    losses,
    winRate,
    goalsFor,
    goalsAgainst,
    totalGoals,
    totalAssists,
    totalMVPs,
    avgRating,
    topScorerId: topScorer?.playerId ?? null,
    topScorerGoals: topScorer?.goals ?? 0,
  }
}
import request from "supertest"
import app from "../app"

describe("Stats", () => {
  let token: string

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: `stats_test_${Date.now()}`, password: "123456" })
    token = res.body.token

    await request(app)
      .post("/api/matches")
      .set("Authorization", `Bearer ${token}`)
      .send({
        result: "win",
        goalsFor: 2,
        goalsAgainst: 0,
        playerStats: [
          {
            playerId: 1,
            goals: 2,
            assists: 0,
            cleanSheet: true,
            yellowCards: 0,
            redCard: false,
            rating: 8.5,
            isMVP: true
          }
        ]
      })
  })

  it("GET /api/stats - should return user stats", async () => {
    const res = await request(app)
      .get("/api/stats")
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("totalMatches", 1)
    expect(res.body).toHaveProperty("wins", 1)
    expect(res.body).toHaveProperty("winRate", 100)
    expect(res.body).toHaveProperty("totalGoals", 2)
    expect(res.body).toHaveProperty("totalMVPs", 1)
    expect(res.body).toHaveProperty("avgRating", 8.5)
  })

  it("GET /api/stats - should fail without token", async () => {
    const res = await request(app).get("/api/stats")
    expect(res.status).toBe(401)
  })
})
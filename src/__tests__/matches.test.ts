import request from "supertest"
import app from "../app"

describe("Matches", () => {
  let token: string

  const matchPayload = {
    result: "win",
    goalsFor: 3,
    goalsAgainst: 1,
    playerStats: [
      {
        playerId: 1,
        goals: 2,
        assists: 1,
        cleanSheet: false,
        yellowCards: 0,
        redCard: false,
        rating: 9.2,
        isMVP: true
      }
    ]
  }

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: `match_test_${Date.now()}`, password: "123456" })
    token = res.body.token
  })

  it("POST /api/matches - should create a match", async () => {
    const res = await request(app)
      .post("/api/matches")
      .set("Authorization", `Bearer ${token}`)
      .send(matchPayload)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("id")
    expect(res.body.result).toBe("win")
    expect(res.body.playerStats.length).toBe(1)
  })

  it("GET /api/matches - should return match history", async () => {
    const res = await request(app)
      .get("/api/matches")
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it("GET /api/matches/:id - should return match by id", async () => {
    const created = await request(app)
      .post("/api/matches")
      .set("Authorization", `Bearer ${token}`)
      .send(matchPayload)
    const res = await request(app)
      .get(`/api/matches/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("id", created.body.id)
  })

  it("GET /api/matches/:id - should return 404 for non-existent match", async () => {
    const res = await request(app)
      .get("/api/matches/999999")
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(404)
  })

  it("GET /api/matches - should fail without token", async () => {
    const res = await request(app).get("/api/matches")
    expect(res.status).toBe(401)
  })
})
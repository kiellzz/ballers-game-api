import request from "supertest"
import app from "../app"

describe("Players", () => {
  let token: string

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: `player_test_${Date.now()}`, password: "123456" })
    token = res.body.token
  })

  it("GET /api/players - should return empty array initially", async () => {
    const res = await request(app)
      .get("/api/players")
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it("POST /api/players - should add a player", async () => {
    const res = await request(app)
      .post("/api/players")
      .set("Authorization", `Bearer ${token}`)
      .send({ playerId: 10, source: "pack" })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("playerId", 10)
    expect(res.body).toHaveProperty("source", "pack")
  })

  it("POST /api/players - should fail with duplicate player", async () => {
    await request(app)
      .post("/api/players")
      .set("Authorization", `Bearer ${token}`)
      .send({ playerId: 20, source: "pack" })
    const res = await request(app)
      .post("/api/players")
      .set("Authorization", `Bearer ${token}`)
      .send({ playerId: 20, source: "pack" })
    expect(res.status).toBe(400)
  })

  it("GET /api/players - should return players after adding", async () => {
    const res = await request(app)
      .get("/api/players")
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it("DELETE /api/players/:playerId - should remove a player", async () => {
    const res = await request(app)
      .delete("/api/players/10")
      .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
  })

  it("GET /api/players - should fail without token", async () => {
    const res = await request(app).get("/api/players")
    expect(res.status).toBe(401)
  })
})
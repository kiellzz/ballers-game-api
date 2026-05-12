import request from "supertest"
import app from "../app"

describe("Auth", () => {
  const testUser = {
    username: `testuser_${Date.now()}`,
    password: "123456"
  }

  it("POST /api/auth/register - should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("token")
    expect(res.body.user.username).toBe(testUser.username)
  })

  it("POST /api/auth/register - should fail with existing username", async () => {
    await request(app).post("/api/auth/register").send(testUser)
    const res = await request(app).post("/api/auth/register").send(testUser)
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("error")
  })

  it("POST /api/auth/register - should fail with short password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "validuser", password: "123" })
    expect(res.status).toBe(400)
  })

  it("POST /api/auth/login - should login successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send(testUser)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("token")
  })

  it("POST /api/auth/login - should fail with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: testUser.username, password: "wrongpassword" })
    expect(res.status).toBe(401)
  })

  it("POST /api/auth/login - should fail with non-existent user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "nonexistent", password: "123456" })
    expect(res.status).toBe(401)
  })
})
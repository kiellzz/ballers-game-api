import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import playerRoutes from "./routes/playerRoutes"
import matchRoutes from "./routes/matchRoutes"
import statsRoutes from "./routes/statsRoutes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/players", playerRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/stats", statsRoutes)

export default app
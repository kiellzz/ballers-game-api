import { Router } from "express"
import * as coinsController from "../controllers/coinsController"
import { authMiddleware } from "../middlewares/auth"

const router = Router()

router.use(authMiddleware)

router.get("/", coinsController.getCoins)

export default router
import { Router } from "express"
import * as statsController from "../controllers/statsController"
import { authMiddleware } from "../middlewares/auth"

const router = Router()

router.use(authMiddleware)

router.get("/", statsController.getUserStats)

export default router
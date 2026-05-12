import { Router } from "express"
import * as playerController from "../controllers/playerController"
import { authMiddleware } from "../middlewares/auth"
import { validate } from "../middlewares/validate"
import { addPlayerSchema } from "../schemas/playerSchema"

const router = Router()

router.use(authMiddleware)

router.get("/", playerController.getUserPlayers)
router.post("/", validate(addPlayerSchema), playerController.addPlayer)
router.delete("/:playerId", playerController.removePlayer)

export default router
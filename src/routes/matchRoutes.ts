import { Router } from "express"
import * as matchController from "../controllers/matchController"
import { authMiddleware } from "../middlewares/auth"
import { validate } from "../middlewares/validate"
import { createMatchSchema } from "../schemas/matchSchema"

const router = Router()

router.use(authMiddleware)

router.post("/", validate(createMatchSchema), matchController.createMatch)
router.get("/", matchController.getMatchHistory)
router.get("/:id", matchController.getMatchById)

export default router
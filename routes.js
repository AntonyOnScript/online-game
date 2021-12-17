import { Router } from "express"
import { gamePage } from "./controllers/gameController"

const router = new Router()

router.get("/game", gamePage)

export default router
import { Router } from "express"
import { gamePage, home } from "./controllers/gameController"

const router = new Router()

router.get("/game?", gamePage)
router.get("/", home)

export default router
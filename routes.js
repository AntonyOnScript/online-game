import { Router } from "express"
import { index, register, login } from "./controllers/home"
const router = new Router()

router.get("/", index)
router.post("/register", register)
router.post("/login", login)

export default router
import { Router } from "express"
import { index, register, login, loginPage, logout } from "./controllers/home"
const router = new Router()

router.get("/", index)
router.get("/register", loginPage)
router.get("/login", loginPage)
router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)

export default router
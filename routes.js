import { Router } from "express"
const router = new Router()

router.get('/', (request, response) => {
    response.json("ok")
})

export default router
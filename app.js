import express from "express"
import routes from "./routes"
import session from "express-session"
import dotenv from "dotenv"
import flash from "connect-flash"
import MongoStore from "connect-mongo"
import csrf from "csurf"
import { csrfToken, checkCsrf } from "./middlewares/global"

dotenv.config()

const sessionConfig = session({
    secret: process.env.THE_SECRET_SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 2 * 60
    })
})

class App{
    constructor() {
        this.app = express()
        this.middlewares()
        this.viewsConfig()
        this.routes()
    }

    middlewares() {
        this.app.use(express.static('./public'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use(flash())
        this.app.use(sessionConfig)
        this.app.use(csrf())
        this.app.use(csrfToken)
        this.app.use(checkCsrf)
    }

    viewsConfig() {
        this.app.set('views', './views')
        this.app.set('view engine', 'ejs')
    }

    routes() {
        this.app.use(routes)
    }
}

export default new App().app
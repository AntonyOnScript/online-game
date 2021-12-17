import express from "express"
import routes from "./routes"

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
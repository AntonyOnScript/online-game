import dotenv from "dotenv"

dotenv.config()

export function gamePage(request, response) {
    if(!request.query.user) {
        return response.redirect(process.env.url)
    }

    response.render("gamepage", { user: request.query.user })
}

export function home(request, response) {
    response.render("home")
}
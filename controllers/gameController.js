export function gamePage(request, response) {
    console.log(request.query)
    if(!request.query.user) {
        return response.redirect("http://localhost:8081/")
    }

    response.render("gamepage", { user: request.query.user })
}

export function home(request, response) {
    response.render("home")
}
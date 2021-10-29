export function globalMiddleware(request, response, next) {
    response.locals.user = request.session.user
    response.locals.errors = request.flash("errors")
    response.locals.success = request.flash("success")

    next()
}

export function checkCsrf(err, request, response, next) {
    const nonSecurePaths = ['/', '/register', '/login'] // TO-DO: REMOVE /REGISTER AND /LOGIN WHEN PRODUCTION
    if(nonSecurePaths.includes(request.path)) return next()

    if(err) {
        return response.json(err)
    }

    next()
}

export function csrfToken(request, response, next) {
    response.locals.csrfToken = request.csrfToken()
    next()
}
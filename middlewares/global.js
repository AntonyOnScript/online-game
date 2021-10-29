export function checkCsrf(err, request, response, next) {
    const nonSecurePaths = ['/']
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
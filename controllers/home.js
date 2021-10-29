import User from "../models/User"

export function index(request, response) {
    response.json("index")
}

export async function register(request, response) {
    const user = new User(request.body)
    const newUser = await user.createUser()

    response.json(newUser)
}

export function login(request, response) {
    response.json("login")
}
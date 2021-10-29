import User from "../models/User"
import dotenv from "dotenv"
dotenv.config()

export function index(request, response) {
    response.render("index")
}

export async function register(request, response) {
    const user = new User(request.body)
    await user.createUser()
    
    if(user.errors.length > 0) {
        request.flash("errors", user.errors)
        request.session.save(() => {
            return response.redirect(process.env.URL)
        })
        return
    }
    
    request.flash("success", "Registred successfully")
    request.session.save(() => {
        response.redirect(process.env.URL)
    })
}

export async function login(request, response) {
    const user = new User(request.body)
    await user.loginUser()
    
    if(user.errors.length > 0) {
        request.flash("errors", user.errors)
        request.session.save(() => {
            return response.redirect(process.env.URL)
        })
        return
    }
    
    request.session.user = user.user
    request.flash("success", "Logged successfully")
    request.session.save(() => {
        response.redirect(process.env.URL)
    })
}

export function loginPage(request, response) {
    response.render("login")
}

export function logout(request, response) {
    request.session.regenerate(() => {
        request.flash("success", "Logout successfully")
        return response.redirect(process.env.URL)
    })
}
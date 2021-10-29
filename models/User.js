import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('User', UserSchema)

export default class User {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async createUser() {
        try {
            this.checkFields()

            if(this.errors.length > 0) return

            const salt = bcrypt.genSaltSync(8)
            this.body.password = bcrypt.hashSync(this.body.password, salt)

            this.user = await UserModel.create(this.body)
            return this.user
        } catch(e) {
            console.log(e)
        }
    }

    checkFields() {
        const bodyKeys = Object.keys(this.body)

        if(!(bodyKeys.includes('email') && bodyKeys.includes('password') && bodyKeys.length === 2)) {
            this.errors.push("Something is wrong with your request :(")
        }

        if(!this.errors.length > 0) {
            for(let i in this.body) {
                let item = this.body[i]
                if(item.length < 1 || typeof item === 'undefined' || typeof item === 'null') {
                    this.errors.push(`${i} need more characters`)
                }
            }
        }
    }

}
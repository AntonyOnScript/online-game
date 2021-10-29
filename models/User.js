import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import unique from "mongoose-unique-validator"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.plugin(unique)

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
        } catch(e) {
            this.errors.push("This user already exists")
        }
    }

    async loginUser() {
        try {
            this.checkFields()
            if(this.errors.length > 0) return
            
            this.user = await UserModel.findOne({ email: this.body.email })
            
            if(!this.user) {
                this.errors.push("User not found")
            }
            if(this.errors.length > 0) return
            if(!bcrypt.compareSync(this.body.password, this.user.password)) {
                this.errors.push("The password is wrong")
            }
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
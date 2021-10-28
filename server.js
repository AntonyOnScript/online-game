import app from "./app"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.emit("ok")
}).catch(e => {
    console.log(e)
})

app.on('ok', () => {
    app.listen(process.env.PORT || 8081, () => console.log("Running!!!"))
})
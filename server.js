import app from "./app"
import mongoose from "mongoose"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"

const server = http.createServer(app)
const io = new Server(server)

dotenv.config()
/*
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.emit("ok")
}).catch(e => {
    console.log(e)
})
*/


//app.on('ok', () => {
    server.listen(process.env.PORT || 8081, () => console.log("Running!!!"))
//})

let playerList = []

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.emit("connected", socket.id)
    socket.on("movement", (player) => {
        var isConnected = false

        playerList.forEach((playerListed, index) => {
            if(isConnected) return

            const theID = playerListed.id
            if(theID === player.id) {
                playerList[index] = player
                isConnected = true
            }
        })

        if(!isConnected) playerList.push(player)

        console.log(player)
        console.log("PLAYER LIST: ", playerList)
        socket.emit("currentPlayersPosition", playerList)
    })
})
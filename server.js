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

io.on("connect", (socket) => {
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
        
        console.log("==== player list ====")
        console.log(playerList)
        console.log("==== player list ====")
        socket.broadcast.emit("currentPlayersPosition", playerList)
    })
    
    socket.on("disconnecting", (reason) => {
        console.log("==== socket rooms ====")
        console.log(socket.rooms.values())
        console.log("==== socket rooms ====")
        for (const room of socket.rooms.values()) {
            if (room === socket.id) {
                playerList.forEach((player, index) => {
                    if(player.id === room) {
                        playerList.splice(index, 1)
                    }
                })
                console.log(room+" has left")
            }
        }
    })
})

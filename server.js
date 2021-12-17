import app from "./app"
import http from "http"
import { Server } from "socket.io"

const server = http.createServer(app)
const io = new Server(server)


server.listen(process.env.PORT || 8081, () => console.log("Running!!!"))

let playerList = []

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Ball() {
    this.posX = 150
    this.posY = 250
    this.width = 15
    this.height = 15

    this.generateRandomPosition = function() {
        this.posX = getRandomInt(0 + this.width, 300 - this.width)
        this.posY = getRandomInt(0 + this.height, 500 - this.height)
    }

    this.checkColision = function() {
        playerList.forEach(player => {
            if((Number(player.posX.toFixed(0)) + Number(player.width/2) >= this.posX - this.width/2 && Number(player.posX.toFixed(0)) - Number(player.width/2) <= this.posX + this.width/2) && (Number(player.posY.toFixed(0)) + Number(player.height/2) >= this.posY - this.height/2 && Number(player.posY.toFixed(0)) - Number(player.height/2) <= this.posY + this.height/2)) {
                this.generateRandomPosition()
            }
        })
    }

}

let theBall = new Ball

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
    })

    socket.on("getPlayersPosition", ()=> {
        socket.emit("currentPlayersPosition", playerList)
        theBall.checkColision()
        socket.emit("currentBallPosition", theBall)
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

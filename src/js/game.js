import { io } from "socket.io-client"
const socket = io()

const POINTS_ELEMENT = document.querySelector(".points")
const CANVAS_ELEMENT = document.querySelector(".canvas")
const CONTEXT = CANVAS_ELEMENT.getContext("2d")
const WIDTH = CANVAS_ELEMENT.width = 300
const HEIGHT = CANVAS_ELEMENT.height = 500
var playerList = []
var points = []

CONTEXT.beginPath()
CONTEXT.fillStyle = "black"
CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(posX, posY, width, height, user) {
    this.posX = posX
    this.posY = posY
    this.width = width
    this.height = height
    this.user = user
    this.points = 0
    
    this.render = function() {
        CONTEXT.beginPath()
        CONTEXT.fillStyle = "white"
        CONTEXT.fillRect(this.posX, this.posY, this.width, this.height)
        CONTEXT.font = "12px serif"
        CONTEXT.fillStyle = "white"
        CONTEXT.fillText(this.user, this.posX - 10, this.posY - 10)
    }

    this.controls = function() {
        window.addEventListener("keydown", (e) => {
            if(e.key === "w") {
                this.posY -= 10.98
                CONTEXT.beginPath()
                CONTEXT.fillStyle = "black"
                CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)
            }

            if(e.key === "s") {
                this.posY += 10.98
                CONTEXT.beginPath()
                CONTEXT.fillStyle = "black"
                CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)
            }

            if(e.key === "a") {
                this.posX -= 10.98
                CONTEXT.beginPath()
                CONTEXT.fillStyle = "black"
                CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)
            }

            if(e.key === "d") {
                this.posX += 10.98
                CONTEXT.beginPath()
                CONTEXT.fillStyle = "black"
                CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)
            }

            socket.emit("movement", this)
        })
    }
}

function TheBall(posX, posY, width, height) {
    this.posX = posX
    this.posY = posY
    this.width = width
    this.height = height

    this.render = function() {
        CONTEXT.beginPath()
        CONTEXT.fillStyle = "green"
        this.setPosition()
    }

    this.setPosition = function() {
        CONTEXT.fillRect(this.posX, this.posY, this.width, this.height)
    }
}

const CURRENT_PLAYER = new Player(12, 12, 15, 15, user)
const THE_BALL = new TheBall(WIDTH/2, HEIGHT/2, 15, 15)

socket.on("connected", givenId => {
    CURRENT_PLAYER.id = givenId
    socket.emit("movement", CURRENT_PLAYER)
})

socket.on("currentPlayersPosition", (playerList) => {
    refreshPositions(playerList)
})

socket.on("points", points => {
    CURRENT_PLAYER.points = points
})

socket.on("currentBallPosition", (ballData) => {
    THE_BALL.posX = ballData.posX
    THE_BALL.posY = ballData.posY
})

function refreshPositions(data) {
    playerList = data
    renderPositions()
    listPointers()
}

function listPointers() {
    points = playerList.map((value, index) => {
        let user = value.user
        let points = value.points
        let pointString = `${user}: ${points}`
        return pointString
    })
    POINTS_ELEMENT.innerHTML = ''
    points.forEach(point => {
        let li = document.createElement("li")
        li.innerText = point
        POINTS_ELEMENT.appendChild(li)
    })
}

function renderPositions() {
    playerList.forEach(player => {
        if(player.id === CURRENT_PLAYER.id) {
            CURRENT_PLAYER.points = player.points
            return
        }
        CONTEXT.beginPath()
        CONTEXT.fillStyle = "purple"
        CONTEXT.fillRect(player.posX, player.posY, player.width, player.height)
        CONTEXT.font = "12px serif"
        CONTEXT.fillStyle = "white"
        CONTEXT.fillText(player.user, player.posX - 10, player.posY - 10)
    })
}

CURRENT_PLAYER.controls()

loop()
function loop() {
    socket.emit("getPlayersPosition")
    THE_BALL.render()
    CONTEXT.beginPath()
    CONTEXT.fillStyle = "black"
    CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)
    renderPositions()

    THE_BALL.render()
    CURRENT_PLAYER.render()

    requestAnimationFrame(loop)
}
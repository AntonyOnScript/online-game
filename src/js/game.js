import { io } from "socket.io-client"
const socket = io()

const CANVAS_ELEMENT = document.querySelector(".canvas")
const CONTEXT = CANVAS_ELEMENT.getContext("2d")
const WIDTH = CANVAS_ELEMENT.width = 300
const HEIGHT = CANVAS_ELEMENT.height = 500
var playerList = []

CONTEXT.beginPath()
CONTEXT.fillStyle = "black"
CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(posX, posY, width, height) {
    this.posX = posX
    this.posY = posY
    this.width = width
    this.height = height
    
    this.render = function() {
        CONTEXT.beginPath()
        CONTEXT.fillStyle = "white"
        CONTEXT.fillRect(this.posX, this.posY, this.width, this.height)
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

    this.generateRandomPosition = function() {
        this.posX = getRandomInt(0 + this.width, WIDTH - this.width)
        this.posY = getRandomInt(0 + this.height, HEIGHT - this.height)
    }
}

const CURRENT_PLAYER = new Player(12, 12, 15, 15)
const THE_BALL = new TheBall(WIDTH/2, HEIGHT/2, 10, 10)

socket.on("connected", givenId => {
    CURRENT_PLAYER.id = givenId
    socket.emit("movement", CURRENT_PLAYER)
})

socket.on("currentPlayersPosition", (playerList) => {
    console.log(playerList)
    refreshPositions(playerList)
})

function refreshPositions(data) {
    playerList = data
    renderPositions()
}

function renderPositions() {
    playerList.forEach(player => {
        if(player.id === CURRENT_PLAYER.id) return
        CONTEXT.beginPath()
        CONTEXT.fillStyle = "purple"
        CONTEXT.fillRect(player.posX, player.posY, player.width, player.height)
    })
}

CURRENT_PLAYER.controls()

loop()
function loop() {
    socket.emit("getPlayersPosition")
    CONTEXT.beginPath()
    CONTEXT.fillStyle = "black"
    CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)
    renderPositions()

    THE_BALL.render()
    CURRENT_PLAYER.render()

    requestAnimationFrame(loop)
}
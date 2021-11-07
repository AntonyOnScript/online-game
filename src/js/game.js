const CANVAS_ELEMENT = document.querySelector(".canvas")
const CONTEXT = CANVAS_ELEMENT.getContext("2d")
const WIDTH = CANVAS_ELEMENT.width = 300
const HEIGHT = CANVAS_ELEMENT.height = 500

CONTEXT.beginPath()
CONTEXT.fillStyle = "black"
CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)

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

                this.render()
            }

            if(e.key === "s") {
                this.posY += 10.98
                CONTEXT.beginPath()
                CONTEXT.fillStyle = "black"
                CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)

                this.render()
            }

            if(e.key === "a") {
                this.posX -= 10.98
                CONTEXT.beginPath()
                CONTEXT.fillStyle = "black"
                CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)

                this.render()
            }

            if(e.key === "d") {
                this.posX += 10.98
                CONTEXT.beginPath()
                CONTEXT.fillStyle = "black"
                CONTEXT.fillRect(0, 0, WIDTH, HEIGHT)

                this.render()
            }
        })
    }
}

const CURRENT_PLAYER = new Player(12, 12, 15, 15)
CURRENT_PLAYER.render()
CURRENT_PLAYER.controls()
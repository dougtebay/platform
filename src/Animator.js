import { KEY_CODES } from './constants'

class Animator {

    constructor (display) {
        this.display = display
        this.level = this.display.level
        this.keysPressed = {}
        this.addListeners()
        this.requestFrame()
    }

    addListeners () {
        addEventListener('keydown', this.handler.bind(this))
        addEventListener('keyup', this.handler.bind(this))
    }

    handler () {
        if (KEY_CODES.hasOwnProperty(event.keyCode)) {
            var keyDown = event.type == 'keydown'
            this.keysPressed[KEY_CODES[event.keyCode]] = keyDown
            event.preventDefault()
        }
    }

    requestFrame () {
        requestAnimationFrame(this.frame.bind(this))
    }

    frame () {
        this.animate()
        this.display.refreshActors()
        requestAnimationFrame(this.frame.bind(this))
    };

    animate () {
        this.level.actors.forEach(function(actor) {
            if (this.keysPressed.left) actor.moveLeft(this.level)
            if (this.keysPressed.right) actor.moveRight(this.level)
        }, this)
    }

}

export { Animator }

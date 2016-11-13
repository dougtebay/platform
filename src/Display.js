class Display {

    constructor (level) {
        this.level = level
        this.scale = 20
        this.app = this.makeElement('div', 'app')
        this.appendElement(this.app, document.body)
        this.background = this.makeElement('table', 'background')
        this.appendElement(this.background, this.app)
        this.renderBackground()
        this.actors = this.makeElement('div', 'actors')
        this.appendElement(this.actors, this.app)
        this.refreshActors()
    }

    makeElement (name, className) {
        var e = document.createElement(name)
        if (className) {
            e.className = className
        }
        return e
    }

    appendElement (child, parent) {
        parent.appendChild(child)
    }

    renderBackground () {
        var self = this
        this.level.background.forEach(function (row) {
            var tr = this.makeElement('tr')
            this.appendElement(tr, this.background)
            row.forEach(function (e) {
            var td = this.makeElement('td', e.type)
            this.appendElement(td, tr)
            }, self)
        }, self)
    }

    renderActors () {
        var self = this
        this.level.actors.forEach(function (actor) {
            var e = self.makeElement('div', actor.type)
            e.style.top = String(actor.position.y * this.scale) + 'px'
            e.style.left = String(actor.position.x * this.scale) + 'px'
            self.appendElement(e, self.actors)
        }, self)
    }

    clearActors () {
        while (this.actors.firstChild) {
            this.actors.removeChild(this.actors.firstChild)
        }
    }

    refreshActors () {
        this.clearActors()
        this.renderActors()
    }

}

export { Display }
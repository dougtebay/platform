class Display {
    constructor(level) {
        this.level = level;
        this.scale = 20;
        let app = this.setUpApp();

        let background = this.setUpBackground(app);
        this.renderBackground(background);

        this.actors = this.setUpActors(app);
        this.renderActors();
    }

    setUpApp() {
        let app = this.makeElement('div', 'app');
        document.body.appendChild(app);

        return app;
    }

    setUpBackground(app) {
        let background = this.makeElement('table', 'background');
        background.style.width = this.level.width * this.scale + "px";
        app.appendChild(background);

        return background;
    }

    setUpActors(app) {
        let actors = this.makeElement('div', 'actors');
        app.appendChild(actors);

        return actors;
    }

    makeElement(type, className) {
        let element = document.createElement(type);
        if (className) element.className = className;

        return element;
    }

    renderBackground(background) {
        this.level.background.forEach(row => {
            var tr = this.makeElement('tr');
            tr.style.height = this.scale + "px";
            background.appendChild(tr);

            row.forEach(element => {
                var td = this.makeElement('td', element.type);
                tr.appendChild(td);
            });
        });
    }

    renderActors() {
        this.level.actors.forEach(actor => {
            var element = this.makeElement('div', actor.type);
            element.style.top = String(actor.position.y * this.scale) + 'px';
            element.style.left = String(actor.position.x * this.scale) + 'px';
            element.style.width = String(actor.size.y * this.scale) + 'px';
            element.style.height = String(actor.size.x * this.scale) + 'px';
            this.actors.appendChild(element);
        });
    }

    clearActors() {
        while (this.actors.firstChild) {
            this.actors.removeChild(this.actors.firstChild);
        }
    }

    refreshActors() {
        this.clearActors();
        this.renderActors();
    }
}

export default Display;

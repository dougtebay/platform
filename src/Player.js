import Vector from './Vector';

class Player {
    constructor(position) {
        this.type = 'player';
        this.position = position;
        this.size = new Vector(1, 1);
        this.speed = new Vector(0, 0);
    }

    moveLeft(level) {
        var nextPosition = new Vector(Math.floor(this.position.x), Math.floor(this.position.y));
        if (!level.hasObstacleAt(nextPosition)) this.position.x -= 0.2;
    }

    moveRight(level) {
        var nextPosition = new Vector(Math.ceil(this.position.x), Math.floor(this.position.y));
        if (!level.hasObstacleAt(nextPosition)) this.position.x += 0.2;
    }
}

export default Player;

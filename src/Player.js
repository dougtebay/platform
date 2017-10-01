import Vector from './Vector';

class Player {
    constructor(position) {
        this.type = 'player';
        this.position = position;
    }

    moveLeft(level) {
        var nextPosition = new Vector(Math.floor(this.position.x), Math.floor(this.position.y));
        if (!level.obstacleAt(nextPosition)) this.position.x -= 0.2;
    }

    moveRight(level) {
        var nextPosition = new Vector(Math.ceil(this.position.x), Math.floor(this.position.y));
        if (!level.obstacleAt(nextPosition)) this.position.x += 0.2;
    }
}

export default Player;

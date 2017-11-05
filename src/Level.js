import Vector from './Vector';
import { LEVEL_PLAN, LEVEL_ELEMENTS } from './constants';

class Level {
    constructor() {
        this.width = LEVEL_PLAN[0].length;
        this.height = LEVEL_PLAN.length;
        this.background = [];
        this.actors = [];
        this.populate();
    }

    populate() {
        LEVEL_PLAN.forEach((row, y) => {
            let backgroundRow = row.split('').reduce((row, square, x) => {
                let element = LEVEL_ELEMENTS[square];

                if (element.type === 'actor') {
                    this.addActor(element, new Vector(x, y));
                }

                row.push(this.addBackground(element));

                return row;
            }, []);
            this.background.push(backgroundRow);
        });
    }

    addBackground(element) {
        if (element.type !== 'background') {
            let space = this.getSpace();

            return new space;
        }

        return new element.class;
    }

    addActor(element, vector) {
        this.actors.push(new element.class(vector));
    }

    getSpace() {
        return LEVEL_ELEMENTS[' '].class;
    }

    hasObstacleAt(position) {
        return this.background[position.y][position.x].type !== 'space';
    }
}

export default Level;

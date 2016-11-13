import { Vector } from './Vector'
import { LEVEL_MAP, ACTORS, BACKGROUND } from './constants'

class Level {

    constructor () {
        this.width = LEVEL_MAP[0].length
        this.height = LEVEL_MAP.length
        this.actors = []
        this.background = []
        this.populate(this.background, BACKGROUND);
        this.populate(this.actors, ACTORS);
    }

    populate (arr, obj) {
        var levelRow
        LEVEL_MAP.forEach(function (row, y) {
            levelRow = []
            row.split('').forEach(function (e, x) {
            if (typeof obj[e] === 'function' && obj.type === 'static') {
                levelRow.push(new obj[e]())
            } else if (typeof obj[e] === 'function' && obj.type === 'dynamic') {
                arr.push(new obj[e](new Vector(x, y)))
            }
        })
        if (levelRow.length > 0) arr.push(levelRow)
        })
    }

    obstacleAt (position) {
        return this.background[position.y][position.x].type !== 'space'
    }

}

export { Level }

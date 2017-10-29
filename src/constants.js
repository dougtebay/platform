import Space from './Space';
import Block from './Block';
import Player from './Player';

const LEVEL_PLAN = [
    '          ',
    '          ',
    ' x  @   x ',
    ' xxxxxxxx ',
    '          '
]

const LEVEL_ELEMENTS = {
    '@': { type: 'actor', class: Player },
    'x': { type: 'background', class: Block },
    ' ': { type: 'background', class: Space }
}

const KEY_CODES = {
    37: 'left',
    38: 'up',
    39: 'right'
}

export { LEVEL_PLAN, LEVEL_ELEMENTS, KEY_CODES }

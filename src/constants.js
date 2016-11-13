import { Space } from './Space'
import { Block } from './Block'
import { Player } from './Player'

const LEVEL_MAP = [
    '          ',
    '          ',
    ' x  @   x ',
    ' xxxxxxxx ',
    '          '
]

const ACTORS = {
    'type': 'dynamic',
    '@': Player
}

const BACKGROUND = {
    'type': 'static',
    '@': Space,
    ' ': Space,
    'x': Block
}

const KEY_CODES = {
    37: 'left',
    38: 'up',
    39: 'right'
}

export { LEVEL_MAP, ACTORS, BACKGROUND, KEY_CODES }
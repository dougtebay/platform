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

export { LEVEL_MAP, ACTORS, BACKGROUND }
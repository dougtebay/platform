import { Level } from './Level'
import { Display } from './Display'
import { Animator } from './Animator'

window.onload = function () {
    new Animator(new Display(new Level()))
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Block = function Block() {
    _classCallCheck(this, Block);

    this.type = 'block';
};

exports.Block = Block;

},{}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Display = (function () {
    function Display(level) {
        _classCallCheck(this, Display);

        this.level = level;
        this.scale = 20;
        this.app = this.makeElement('div', 'app');
        this.appendElement(this.app, document.body);
        this.background = this.makeElement('table', 'background');
        this.appendElement(this.background, this.app);
        this.renderBackground();
        this.actors = this.makeElement('div', 'actors');
        this.appendElement(this.actors, this.app);
        this.refreshActors();
    }

    Display.prototype.makeElement = function makeElement(name, className) {
        var e = document.createElement(name);
        if (className) {
            e.className = className;
        }
        return e;
    };

    Display.prototype.appendElement = function appendElement(child, parent) {
        parent.appendChild(child);
    };

    Display.prototype.renderBackground = function renderBackground() {
        var self = this;
        this.level.background.forEach(function (row) {
            var tr = this.makeElement('tr');
            this.appendElement(tr, this.background);
            row.forEach(function (e) {
                var td = this.makeElement('td', e.type);
                this.appendElement(td, tr);
            }, self);
        }, self);
    };

    Display.prototype.renderActors = function renderActors() {
        var self = this;
        this.level.actors.forEach(function (actor) {
            var e = self.makeElement('div', actor.type);
            e.style.top = String(actor.position.y * this.scale) + 'px';
            e.style.left = String(actor.position.x * this.scale) + 'px';
            self.appendElement(e, self.actors);
        }, self);
    };

    Display.prototype.clearActors = function clearActors() {
        while (this.actors.firstChild) {
            this.actors.removeChild(this.actors.firstChild);
        }
    };

    Display.prototype.refreshActors = function refreshActors() {
        this.clearActors();
        this.renderActors();
    };

    return Display;
})();

exports.Display = Display;

},{}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Vector = require('./Vector');

var _constants = require('./constants');

var Level = (function () {
    function Level() {
        _classCallCheck(this, Level);

        this.width = _constants.LEVEL_MAP[0].length;
        this.height = _constants.LEVEL_MAP.length;
        this.actors = [];
        this.background = [];
        this.populate(this.background, _constants.BACKGROUND);
        this.populate(this.actors, _constants.ACTORS);
    }

    Level.prototype.populate = function populate(arr, obj) {
        var levelRow;
        _constants.LEVEL_MAP.forEach(function (row, y) {
            levelRow = [];
            row.split('').forEach(function (e, x) {
                if (typeof obj[e] === 'function' && obj.type === 'static') {
                    levelRow.push(new obj[e]());
                } else if (typeof obj[e] === 'function' && obj.type === 'dynamic') {
                    arr.push(new obj[e](new _Vector.Vector(x, y)));
                }
            });
            if (levelRow.length > 0) arr.push(levelRow);
        });
    };

    return Level;
})();

exports.Level = Level;

},{"./Vector":6,"./constants":7}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Player = function Player(position) {
    _classCallCheck(this, Player);

    this.type = 'player';
    this.position = position;
};

exports.Player = Player;

},{}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Space = function Space() {
    _classCallCheck(this, Space);

    this.type = 'space';
};

exports.Space = Space;

},{}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
};

exports.Vector = Vector;

},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _Space = require('./Space');

var _Block = require('./Block');

var _Player = require('./Player');

var LEVEL_MAP = ['          ', '          ', ' x  @   x ', ' xxxxxxxx ', '          '];

var ACTORS = {
    'type': 'dynamic',
    '@': _Player.Player
};

var BACKGROUND = {
    'type': 'static',
    '@': _Space.Space,
    ' ': _Space.Space,
    'x': _Block.Block
};

exports.LEVEL_MAP = LEVEL_MAP;
exports.ACTORS = ACTORS;
exports.BACKGROUND = BACKGROUND;

},{"./Block":1,"./Player":4,"./Space":5}],8:[function(require,module,exports){
'use strict';

var _Level = require('./Level');

var _Display = require('./Display');

window.onload = function () {
    new _Display.Display(new _Level.Level());
};

},{"./Display":2,"./Level":3}]},{},[8]);

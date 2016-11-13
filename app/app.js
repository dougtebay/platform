(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function Block() {
    _classCallCheck(this, Block);
};

//
exports.Block = Block;

},{}],2:[function(require,module,exports){
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

},{"./Vector":5,"./constants":6}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player() {
    _classCallCheck(this, Player);
};

//
exports.Player = Player;

},{}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Space = function Space() {
    _classCallCheck(this, Space);
};

//
exports.Space = Space;

},{}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function Vector() {
    _classCallCheck(this, Vector);
};

//
exports.Vector = Vector;

},{}],6:[function(require,module,exports){
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

},{"./Block":1,"./Player":3,"./Space":4}],7:[function(require,module,exports){
'use strict';

var _Level = require('./Level');

var level = new _Level.Level();
debugger;

},{"./Level":2}]},{},[7]);

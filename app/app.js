(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _constants = require('./constants');

var Animator = (function () {
    function Animator(display) {
        _classCallCheck(this, Animator);

        this.display = display;
        this.level = this.display.level;
        this.keysPressed = {};
        this.addListeners();
        this.requestFrame();
    }

    Animator.prototype.addListeners = function addListeners() {
        addEventListener('keydown', this.handler.bind(this));
        addEventListener('keyup', this.handler.bind(this));
    };

    Animator.prototype.handler = function handler() {
        if (_constants.KEY_CODES.hasOwnProperty(event.keyCode)) {
            var keyDown = event.type == 'keydown';
            this.keysPressed[_constants.KEY_CODES[event.keyCode]] = keyDown;
            event.preventDefault();
        }
    };

    Animator.prototype.requestFrame = function requestFrame() {
        requestAnimationFrame(this.frame.bind(this));
    };

    Animator.prototype.frame = function frame() {
        this.animate();
        this.display.refreshActors();
        requestAnimationFrame(this.frame.bind(this));
    };

    Animator.prototype.animate = function animate() {
        var _this = this;

        this.level.actors.forEach(function (actor) {
            if (_this.keysPressed.left) actor.moveLeft(_this.level);
            if (_this.keysPressed.right) actor.moveRight(_this.level);
        });
    };

    return Animator;
})();

exports['default'] = Animator;
module.exports = exports['default'];

},{"./constants":8}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Block = function Block() {
    _classCallCheck(this, Block);

    this.type = 'block';
};

exports['default'] = Block;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
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
        if (className) e.className = className;
        return e;
    };

    Display.prototype.appendElement = function appendElement(child, parent) {
        parent.appendChild(child);
    };

    Display.prototype.renderBackground = function renderBackground() {
        var _this = this;

        this.level.background.forEach(function (row) {
            var tr = _this.makeElement('tr');
            _this.appendElement(tr, _this.background);
            row.forEach(function (e) {
                var td = _this.makeElement('td', e.type);
                _this.appendElement(td, tr);
            });
        });
    };

    Display.prototype.renderActors = function renderActors() {
        var _this2 = this;

        this.level.actors.forEach(function (actor) {
            var e = _this2.makeElement('div', actor.type);
            e.style.top = String(actor.position.y * _this2.scale) + 'px';
            e.style.left = String(actor.position.x * _this2.scale) + 'px';
            _this2.appendElement(e, _this2.actors);
        });
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

exports['default'] = Display;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

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
                    arr.push(new obj[e](new _Vector2['default'](x, y)));
                }
            });
            if (levelRow.length > 0) arr.push(levelRow);
        });
    };

    Level.prototype.obstacleAt = function obstacleAt(position) {
        return this.background[position.y][position.x].type !== 'space';
    };

    return Level;
})();

exports['default'] = Level;
module.exports = exports['default'];

},{"./Vector":7,"./constants":8}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var Player = (function () {
    function Player(position) {
        _classCallCheck(this, Player);

        this.type = 'player';
        this.position = position;
    }

    Player.prototype.moveLeft = function moveLeft(level) {
        var nextPosition = new _Vector2['default'](Math.floor(this.position.x), Math.floor(this.position.y));
        if (!level.obstacleAt(nextPosition)) this.position.x -= 0.2;
    };

    Player.prototype.moveRight = function moveRight(level) {
        var nextPosition = new _Vector2['default'](Math.ceil(this.position.x), Math.floor(this.position.y));
        if (!level.obstacleAt(nextPosition)) this.position.x += 0.2;
    };

    return Player;
})();

exports['default'] = Player;
module.exports = exports['default'];

},{"./Vector":7}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Space = function Space() {
    _classCallCheck(this, Space);

    this.type = 'space';
};

exports['default'] = Space;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
};

exports["default"] = Vector;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Space = require('./Space');

var _Space2 = _interopRequireDefault(_Space);

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var LEVEL_MAP = ['          ', '          ', ' x  @   x ', ' xxxxxxxx ', '          '];

var ACTORS = {
    'type': 'dynamic',
    '@': _Player2['default']
};

var BACKGROUND = {
    'type': 'static',
    '@': _Space2['default'],
    ' ': _Space2['default'],
    'x': _Block2['default']
};

var KEY_CODES = {
    37: 'left',
    38: 'up',
    39: 'right'
};

exports.LEVEL_MAP = LEVEL_MAP;
exports.ACTORS = ACTORS;
exports.BACKGROUND = BACKGROUND;
exports.KEY_CODES = KEY_CODES;

},{"./Block":2,"./Player":5,"./Space":6}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Level = require('./Level');

var _Level2 = _interopRequireDefault(_Level);

var _Display = require('./Display');

var _Display2 = _interopRequireDefault(_Display);

var _Animator = require('./Animator');

var _Animator2 = _interopRequireDefault(_Animator);

window.onload = function () {
    new _Animator2['default'](new _Display2['default'](new _Level2['default']()));
};

},{"./Animator":1,"./Display":3,"./Level":4}]},{},[9]);

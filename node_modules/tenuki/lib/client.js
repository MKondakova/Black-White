"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = require("./game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Client = function Client() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this._boardElement = options["element"];
  this._setup(options);
};

Client.prototype = {
  _setup: function _setup(_ref) {
    var _this = this;

    var player = _ref.player,
        gameOptions = _ref.gameOptions,
        hooks = _ref.hooks;

    this._player = player;
    this._hooks = hooks;

    if (this._player !== "black" && this._player !== "white") {
      throw new Error("Player must be either black or white, but was given: " + this._player);
    }

    gameOptions["_hooks"] = {
      handleClick: function handleClick(y, x) {
        if (_this._busy) {
          return;
        }

        _this._busy = true;

        if (_this.isOver()) {
          var stonesToBeMarkedDead = _this._game.currentState().groupAt(y, x).map(function (i) {
            return {
              y: i.y,
              x: i.x,
              color: i.color
            };
          });

          _this._hooks.submitMarkDeadAt(y, x, stonesToBeMarkedDead, function (result) {
            if (result) {
              _this._game.toggleDeadAt(y, x);
            }

            _this._busy = false;
          });
        } else {
          if (_this._player !== _this.currentPlayer() || _this._game.isIllegalAt(y, x)) {
            _this._busy = false;

            return;
          }

          _this._hooks.submitPlay(y, x, function (result) {
            if (result) {
              _this._game.playAt(y, x);
            }

            _this._busy = false;
          });
        }
      },

      hoverValue: function hoverValue(y, x) {
        if (!_this._busy && _this._player === _this.currentPlayer() && !_this.isOver() && !_this._game.isIllegalAt(y, x)) {
          return _this._player;
        }
      },

      gameIsOver: function gameIsOver() {
        return _this.isOver();
      }
    };

    if (this._boardElement) {
      this._game = new _game2.default(Object.assign({ element: this._boardElement }, gameOptions));
    } else {
      this._game = new (Function.prototype.bind.apply(_game2.default, [null].concat(_toConsumableArray(gameOptions))))();
    }
  },

  isOver: function isOver() {
    return this._game.isOver();
  },

  currentPlayer: function currentPlayer() {
    return this._game.currentPlayer();
  },

  receivePlay: function receivePlay(y, x) {
    if (this._player === this.currentPlayer()) {
      return;
    }

    this._game.playAt(y, x);
  },

  moveNumber: function moveNumber() {
    return this._game.moveNumber();
  },

  receivePass: function receivePass() {
    if (this._player === this.currentPlayer()) {
      return;
    }

    this._game.pass();
  },

  receiveMarkDeadAt: function receiveMarkDeadAt(y, x) {
    this._game.toggleDeadAt(y, x);
  },

  deadStones: function deadStones() {
    return this._game.deadStones();
  },

  setDeadStones: function setDeadStones(points) {
    this._game._deadPoints = points.map(function (i) {
      return {
        y: i.y,
        x: i.x
      };
    });

    this._game.render();
  },

  pass: function pass() {
    var _this2 = this;

    if (this._busy || this._player !== this.currentPlayer() || this.isOver()) {
      return;
    }

    this._busy = true;

    this._hooks.submitPass(function (result) {
      if (result) {
        _this2._game.pass();
      }

      _this2._busy = false;
    });
  }
};

exports.default = Client;

//# sourceMappingURL=client.js.map
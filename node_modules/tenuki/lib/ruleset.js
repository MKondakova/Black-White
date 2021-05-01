"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VALID_KO_OPTIONS = ["simple", "positional-superko", "situational-superko", "natural-situational-superko"];

var Ruleset = function Ruleset(_ref) {
  var koRule = _ref.koRule;

  this.koRule = koRule;

  if (VALID_KO_OPTIONS.indexOf(this.koRule) < 0) {
    throw new Error("Unknown ko rule: " + koRule);
  }

  Object.freeze(this);
};

Ruleset.prototype = {
  isIllegal: function isIllegal(y, x, game) {
    var boardState = game.currentState();
    var intersection = boardState.intersectionAt(y, x);

    var result = !intersection.isEmpty() || this._wouldBeSuicide(y, x, boardState) || this._isKoViolation(y, x, boardState, game._moves);

    return result;
  },

  _isKoViolation: function _isKoViolation(y, x, boardState, existingStates) {
    var isKoViolation = false;

    if (this.koRule === "simple") {
      var simpleKoPoint = boardState._simpleKoPoint();
      isKoViolation = Boolean(simpleKoPoint) && y === simpleKoPoint.y && x === simpleKoPoint.x;
    } else {
      var newState = boardState.playAt(y, x, boardState.nextColor());

      var hasDuplicatePosition = function hasDuplicatePosition(condition) {
        return existingStates.length > 0 && existingStates.some(function (existingState) {
          return condition(existingState) && existingState.positionSameAs(newState);
        });
      };

      if (this.koRule === "positional-superko") {
        isKoViolation = hasDuplicatePosition(function () {
          return true;
        });
      } else if (this.koRule === "situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return state.color === newState.color;
        });
      } else if (this.koRule === "natural-situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return !state.pass && state.color === newState.color;
        });
      } else {
        throw new Error("Unimplemented ko rule " + this.koRule);
      }
    }

    return isKoViolation;
  },

  _wouldBeSuicide: function _wouldBeSuicide(y, x, boardState) {
    var color = boardState.nextColor();
    var intersection = boardState.intersectionAt(y, x);
    var surroundedEmptyPoint = intersection.isEmpty() && boardState.neighborsFor(intersection.y, intersection.x).filter(function (neighbor) {
      return neighbor.isEmpty();
    }).length === 0;

    if (!surroundedEmptyPoint) {
      return false;
    }

    var someFriendlyNotInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var friendly = neighbor.isOccupiedWith(color);

      return friendly && !inAtari;
    });

    if (someFriendlyNotInAtari) {
      return false;
    }

    var someEnemyInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var enemy = !neighbor.isOccupiedWith(color);

      return enemy && inAtari;
    });

    if (someEnemyInAtari) {
      return false;
    }

    return true;
  }
};

exports.default = Ruleset;

//# sourceMappingURL=ruleset.js.map
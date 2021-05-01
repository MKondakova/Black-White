"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _intersection = require("./intersection");

var _intersection2 = _interopRequireDefault(_intersection);

var _region = require("./region");

var _region2 = _interopRequireDefault(_region);

var _eyePoint = require("./eye-point");

var _eyePoint2 = _interopRequireDefault(_eyePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardStateWithoutDeadPoints = function boardStateWithoutDeadPoints(game) {
  return game.currentState()._withoutIntersectionsMatching(function (i) {
    return game._isDeadAt(i.y, i.x);
  });
};

var boardStateWithoutNeutralPoints = function boardStateWithoutNeutralPoints(boardState) {
  var regions = _region2.default.allFor(boardState);
  var neutralRegions = regions.filter(function (r) {
    return r.isNeutral();
  });

  if (regions.length === 0 || neutralRegions.length === 0) {
    return boardState;
  }

  var replacements = {};

  neutralRegions.forEach(function (r) {
    var startingX = null;
    var startingY = null;

    r.intersections.forEach(function (intersection) {
      startingX = startingX || intersection.x;
      startingX = startingX || intersection.y;

      var manhattanDistance = Math.abs(intersection.y - startingY) + Math.abs(intersection.x - startingX);
      var replacementColor = ["black", "white"][manhattanDistance % 2];
      var replacement = new _intersection2.default(intersection.y, intersection.x, replacementColor);

      replacements[intersection.y] = replacements[intersection.y] || [];
      replacements[intersection.y][intersection.x] = replacement;
    });
  });

  var newPoints = boardState.intersections.map(function (i) {
    if (replacements[i.y] && replacements[i.y][i.x]) {
      return replacements[i.y][i.x];
    } else {
      return i;
    }
  });

  return boardState._withNewPoints(newPoints);
};

var boardStateWithClearFalseEyesFilled = function boardStateWithClearFalseEyesFilled(boardState) {
  var territoryRegions = _region2.default.allFor(boardState).filter(function (r) {
    return r.isTerritory();
  });
  var falseEyePoints = _utils2.default.flatMap(territoryRegions, function (r) {
    return r.intersections;
  }).filter(function (i) {
    return new _eyePoint2.default(boardState, i).isFalse();
  });

  var pointsNeighboringAtari = falseEyePoints.filter(function (i) {
    return boardState.neighborsFor(i.y, i.x).some(function (n) {
      return boardState.inAtari(n.y, n.x);
    });
  });
  var neutralAtariUpdatedState = boardState;

  var _loop = function _loop() {
    var newPoints = neutralAtariUpdatedState.intersections.map(function (i) {
      if (pointsNeighboringAtari.indexOf(i) > -1) {
        return new _intersection2.default(i.y, i.x, new _eyePoint2.default(neutralAtariUpdatedState, i).filledColor());
      } else {
        return i;
      }
    });
    neutralAtariUpdatedState = neutralAtariUpdatedState._withNewPoints(newPoints);

    var boardState = boardStateWithoutNeutralPoints(neutralAtariUpdatedState);
    var territoryRegions = _region2.default.allFor(boardState).filter(function (r) {
      return r.isTerritory();
    });
    var falseEyePoints = _utils2.default.flatMap(territoryRegions, function (r) {
      return r.intersections;
    }).filter(function (i) {
      return new _eyePoint2.default(boardState, i).isFalse();
    });

    pointsNeighboringAtari = falseEyePoints.filter(function (i) {
      return neutralAtariUpdatedState.neighborsFor(i.y, i.x).some(function (n) {
        return neutralAtariUpdatedState.inAtari(n.y, n.x);
      });
    });
  };

  while (pointsNeighboringAtari.length > 0) {
    _loop();
  }

  return neutralAtariUpdatedState;
};

var TerritoryScoring = Object.freeze({
  score: function score(game) {
    var blackDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isBlack();
    });
    var whiteDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isWhite();
    });

    var territory = game.territory();
    var boardState = game.currentState();

    return {
      black: territory.black.length + boardState.whiteStonesCaptured + whiteDeadAsCaptures.length,
      white: territory.white.length + boardState.blackStonesCaptured + blackDeadAsCaptures.length
    };
  },

  territory: function territory(game) {
    var stateWithoutDeadPoints = boardStateWithoutDeadPoints(game);
    var stateWithoutNeutrals = boardStateWithoutNeutralPoints(stateWithoutDeadPoints);
    var stateWithClearFalseEyesFilled = boardStateWithClearFalseEyesFilled(stateWithoutNeutrals);

    var territoryRegions = _region2.default.allFor(stateWithClearFalseEyesFilled).filter(function (r) {
      return r.isTerritory();
    });

    var territoryRegionsWithoutSeki = territoryRegions.filter(function (r) {
      var merged = _region2.default.merge(territoryRegions, r);
      var eyeCounts = merged.map(function (m) {
        return Math.ceil(m.numberOfEyes());
      });

      return eyeCounts.length > 0 && eyeCounts.reduce(function (a, b) {
        return a + b;
      }) >= 2;
    });

    var blackRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isWhite();
    });

    return {
      black: _utils2.default.flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      }),
      white: _utils2.default.flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      })
    };
  }
});

var AreaScoring = Object.freeze({
  score: function score(game) {
    var blackStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isBlack() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var whiteStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isWhite() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var territory = game.territory();

    return {
      black: territory.black.length + blackStonesOnTheBoard.length,
      white: territory.white.length + whiteStonesOnTheBoard.length
    };
  },

  territory: function territory(game) {
    var regions = _region2.default.allFor(boardStateWithoutDeadPoints(game));
    var territoryRegions = regions.filter(function (r) {
      return r.isTerritory();
    });
    var blackRegions = territoryRegions.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegions.filter(function (r) {
      return r.isWhite();
    });

    return {
      black: _utils2.default.flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      }),
      white: _utils2.default.flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      })
    };
  }
});

var Scorer = function Scorer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      scoreBy = _ref.scoreBy,
      komi = _ref.komi;

  this._strategy = {
    "area": AreaScoring,
    "territory": TerritoryScoring,
    "equivalence": AreaScoring
  }[scoreBy];

  this._komi = komi;

  if (!this._strategy) {
    throw new Error("Unknown scoring type: " + scoreBy);
  }

  if (this._komi === null || typeof this._komi === "undefined") {
    throw new Error("Error initializing scorer without a komi value");
  }

  if (typeof this._komi !== "number") {
    throw new Error("Komi value given is not a number: " + komi);
  }

  this._usePassStones = scoreBy === "equivalence";

  Object.freeze(this);
};

Scorer.prototype = {
  score: function score(game) {
    var result = this._strategy.score(game);
    result.white += this._komi;

    if (this._usePassStones) {
      // Under equivalence scoring, 2 consecutive passes signals(!) the end of the
      // game, but just prior to the end of the game, white must make one final
      // pass move if the game didn't end on a white pass.
      //
      // However, instead of creating a 3rd consecutive pass in the board state,
      // white's additional pass stone is handled by the scoring mechanism alone.
      // The idea is that, under any game resumption, the additional white pass
      // stone must not exist, so we shouldn't add it.
      //
      // NOTE: the final result should rely on this scoring function. Any calculations
      // using raw board state pass stone numbers may be off by 1 in favor of black.
      var needsFinalWhitePassStone = game.currentState().color !== "white";

      return {
        black: result.black + game.currentState().whitePassStones + (needsFinalWhitePassStone ? 1 : 0),
        white: result.white + game.currentState().blackPassStones
      };
    } else {
      return result;
    }
  },

  territory: function territory(game) {
    return this._strategy.territory(game);
  },

  usingPassStones: function usingPassStones() {
    return this._usePassStones;
  }
};

exports.default = Scorer;

//# sourceMappingURL=scorer.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EyePoint = function EyePoint(boardState, intersection) {
  this.boardState = boardState;
  this.intersection = intersection;

  Object.freeze(this);
};

EyePoint.prototype = {
  diagonals: function diagonals() {
    var _this = this;

    var diagonals = [];

    var possibleX = [];
    var possibleY = [];

    if (this.intersection.x > 0) {
      possibleX.push(this.intersection.x - 1);
    }

    if (this.intersection.x < this.boardState.boardSize - 1) {
      possibleX.push(this.intersection.x + 1);
    }

    if (this.intersection.y > 0) {
      possibleY.push(this.intersection.y - 1);
    }

    if (this.intersection.y < this.boardState.boardSize - 1) {
      possibleY.push(this.intersection.y + 1);
    }

    possibleX.forEach(function (x) {
      possibleY.forEach(function (y) {
        diagonals.push(_this.boardState.intersectionAt(y, x));
      });
    });

    return diagonals;
  },

  isFalse: function isFalse() {
    if (!this.intersection.isEmpty()) {
      return false;
    }

    var diagonals = this.diagonals();
    var onFirstLine = diagonals.length <= 2;

    var neighbors = this.neighbors();
    var occupiedNeighbors = neighbors.filter(function (i) {
      return !i.isEmpty();
    });

    if (onFirstLine && occupiedNeighbors.length < 1) {
      return false;
    }

    if (!onFirstLine && occupiedNeighbors.length < 2) {
      return false;
    }

    var opposingOccupiedDiagonals = diagonals.filter(function (d) {
      return !d.isEmpty() && !d.sameColorAs(occupiedNeighbors[0]);
    });

    if (onFirstLine) {
      return opposingOccupiedDiagonals.length >= 1;
    } else {
      return opposingOccupiedDiagonals.length >= 2;
    }
  },

  neighbors: function neighbors() {
    return this.boardState.neighborsFor(this.intersection.y, this.intersection.x);
  },

  filledColor: function filledColor() {
    if (!this.isFalse()) {
      throw new Error("Attempting to find filled color for a non-false eye");
    }

    return this.neighbors()[0].value;
  }
};

exports.default = EyePoint;

//# sourceMappingURL=eye-point.js.map
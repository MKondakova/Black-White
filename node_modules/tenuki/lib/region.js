"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Region = function Region(boardState, intersections) {
  this.boardState = boardState;
  this.intersections = intersections;

  this._computed = {};

  Object.freeze(this);
};

Region._startingAt = function (boardState, y, x) {
  var startingPoint = boardState.intersectionAt(y, x);

  var _boardState$partition = boardState.partitionTraverse(startingPoint, function (neighbor) {
    return neighbor.sameColorAs(startingPoint);
  }),
      _boardState$partition2 = _slicedToArray(_boardState$partition, 2),
      includedPoints = _boardState$partition2[0],
      boundaryPoints = _boardState$partition2[1];

  return [includedPoints, boundaryPoints];
};

Region.allFor = function (boardState) {
  var checkedPoints = [];
  var regions = [];

  boardState.intersections.forEach(function (point) {
    if (checkedPoints.indexOf(point) > -1) {
      // do nothing
    } else {
      var _boardState$partition3 = boardState.partitionTraverse(point, function (neighbor) {
        return neighbor.sameColorAs(point);
      }),
          _boardState$partition4 = _slicedToArray(_boardState$partition3, 2),
          regionPoints = _boardState$partition4[0],
          _ = _boardState$partition4[1];

      regions.push(new Region(boardState, regionPoints));
      checkedPoints = checkedPoints.concat(regionPoints);
    }
  });

  return regions;
};

Region.merge = function (regions, region) {
  var mergedRegions = [region];
  var length = -1;

  while (mergedRegions.length !== length) {
    length = mergedRegions.length;

    mergedRegions = regions.filter(function (r) {
      return r.isEmpty() && r.isTerritory() && r.territoryColor() === region.territoryColor() && r.expandedBoundaryStones().some(function (stone) {
        return mergedRegions.some(function (latestRegion) {
          return latestRegion.expandedBoundaryStones().indexOf(stone) > -1;
        });
      });
    });
  }

  return mergedRegions;
};

Region.prototype = {
  isEmpty: function isEmpty() {
    return this.intersections[0].isEmpty();
  },

  isTerritory: function isTerritory() {
    var point = this.intersections[0];

    if (!point.isEmpty()) {
      return false;
    }

    var _Region$_startingAt = Region._startingAt(this.boardState, point.y, point.x),
        _Region$_startingAt2 = _slicedToArray(_Region$_startingAt, 2),
        _ = _Region$_startingAt2[0],
        boundaryPoints = _Region$_startingAt2[1];

    var surroundingColors = _utils2.default.unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";

    return isTerritory;
  },

  territoryColor: function territoryColor() {
    var point = this.intersections[0];

    var _Region$_startingAt3 = Region._startingAt(this.boardState, point.y, point.x),
        _Region$_startingAt4 = _slicedToArray(_Region$_startingAt3, 2),
        _ = _Region$_startingAt4[0],
        boundaryPoints = _Region$_startingAt4[1];

    var surroundingColors = _utils2.default.unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";

    if (!point.isEmpty() || !isTerritory) {
      throw new Error("Attempted to obtain territory color for something that isn't territory, region containing " + point.y + "," + point.x);
    } else {
      return surroundingColors[0];
    }
  },

  isBlack: function isBlack() {
    return this.territoryColor() === "black";
  },

  isWhite: function isWhite() {
    return this.territoryColor() === "white";
  },

  isNeutral: function isNeutral() {
    return !this.intersections[0].isBlack() && !this.intersections[0].isWhite() && !this.isTerritory();
  },

  exterior: function exterior() {
    var _this = this;

    return this.boardState.intersections.filter(function (i) {
      return _this.intersections.indexOf(i) < 0 && _this.boardState.neighborsFor(i.y, i.x).some(function (neighbor) {
        return _this.intersections.indexOf(neighbor) > -1;
      });
    });
  },

  boundaryStones: function boundaryStones() {
    var _this2 = this;

    if (this._computed.boundaryStones) {
      return this._computed.boundaryStones;
    }

    if (!this.isEmpty()) {
      throw new Error("Attempted to obtain boundary stones for non-empty region");
    }

    this._computed.boundaryStones = this.exterior().filter(function (i) {
      return !i.sameColorAs(_this2.intersections[0]);
    });

    return this._computed.boundaryStones;
  },

  expandedBoundaryStones: function expandedBoundaryStones() {
    if (this._computed.expandedBoundaryStones) {
      return this._computed.expandedBoundaryStones;
    }

    var boundaryStones = this.boundaryStones();
    var regions = Region.allFor(this.boardState).filter(function (r) {
      return r.intersections.some(function (i) {
        return boundaryStones.indexOf(i) > -1;
      });
    });

    this._computed.expandedBoundaryStones = _utils2.default.flatMap(regions, function (r) {
      return r.intersections;
    });

    return this._computed.expandedBoundaryStones;
  },

  lengthOfTerritoryBoundary: function lengthOfTerritoryBoundary() {
    var _this3 = this;

    // count the empty border points to treat the edge of the board itself as points
    var borderPoints = this.intersections.filter(function (i) {
      return i.y === 0 || i.y === _this3.boardState.boardSize - 1 || i.x === 0 || i.x === _this3.boardState.boardSize - 1;
    });
    var cornerPoints = this.intersections.filter(function (i) {
      return i.y % _this3.boardState.boardSize - 1 === 0 && i.x % _this3.boardState.boardSize - 1 === 0;
    });

    return this.boundaryStones().length + borderPoints.length + cornerPoints.length;
  },

  containsSquareFour: function containsSquareFour() {
    var _this4 = this;

    return this.intersections.some(function (i) {
      return [[0, 0], [0, 1], [1, 0], [1, 1]].every(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            yOffset = _ref2[0],
            xOffset = _ref2[1];

        var y = i.y + yOffset;
        var x = i.x + xOffset;

        var onTheBoard = y >= 0 && y < _this4.boardState.boardSize && x >= 0 && x < _this4.boardState.boardSize;

        return onTheBoard && _this4.boardState.intersectionAt(y, x).sameColorAs(i);
      });
    });
  },

  containsCurvedFour: function containsCurvedFour() {
    var _this5 = this;

    return this.intersections.some(function (i) {
      return [[[0, 0], [1, 0], [2, 0], [2, 1]], [[-1, 2], [0, 0], [0, 1], [0, 2]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[-1, 0], [-1, 1], [-1, 2], [0, 0]], [[-2, 1], [-1, 1], [0, 0], [0, 1]], [[0, 0], [1, 0], [1, 1], [1, 2]], [[0, -1], [0, 0], [1, -1], [2, -1]], [[-1, -2], [-1, -1], [-1, 0], [0, 0]]].some(function (expectedPoints) {
        return expectedPoints.every(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              yOffset = _ref4[0],
              xOffset = _ref4[1];

          var y = i.y + yOffset;
          var x = i.x + xOffset;

          var onTheBoard = y >= 0 && y < _this5.boardState.boardSize && x >= 0 && x < _this5.boardState.boardSize;

          return onTheBoard && _this5.boardState.intersectionAt(y, x).sameColorAs(i);
        });
      });
    });
  },

  numberOfEyes: function numberOfEyes() {
    if (!this.intersections[0].isEmpty()) {
      throw new Error("Unexpected calculation of number of eyes for a non-empty region containing " + this.intersections[0].y + "," + this.intersections[0].x);
    }

    var boundaryLength = this.lengthOfTerritoryBoundary();

    if (boundaryLength < 2) {
      throw new Error("Unexpected boundary length of " + boundaryLength + " for region including " + this.intersections[0].y + "," + this.intersections[0].x);
    }

    if (boundaryLength >= 10) {
      return 2;
    }

    var eyes = void 0;

    switch (boundaryLength) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        eyes = 1;
        break;
      case 7:
        eyes = 1.5;
        break;
      case 8:
        if (this.containsSquareFour()) {
          eyes = 1;
        } else if (this.containsCurvedFour()) {
          eyes = 2;
        } else {
          eyes = 1.5;
        }

        break;
      case 9:
        if (this.containsSquareFour()) {
          eyes = 1.5;
        } else {
          eyes = 2;
        }
        break;

      default:
        throw new Error("unhandled boundary length " + boundaryLength);
    }

    return eyes;
  }
};

exports.default = Region;

//# sourceMappingURL=region.js.map
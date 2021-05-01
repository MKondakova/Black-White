"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Intersection = function Intersection(y, x, value) {
  this.y = y;
  this.x = x;
  this.value = value || "empty";

  Object.freeze(this);
};

Intersection.prototype = {
  isOccupiedWith: function isOccupiedWith(color) {
    if (this.isEmpty()) {
      return false;
    }

    return this.value === color;
  },

  isBlack: function isBlack() {
    return this.value === "black";
  },

  isWhite: function isWhite() {
    return this.value === "white";
  },

  isEmpty: function isEmpty() {
    return this.value === "empty";
  },

  sameColorAs: function sameColorAs(otherIntersection) {
    return this.value === otherIntersection.value;
  }
};

exports.default = Intersection;

//# sourceMappingURL=intersection.js.map
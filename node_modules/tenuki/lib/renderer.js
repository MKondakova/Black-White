"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Renderer = function Renderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  this.INTERSECTION_GAP_SIZE = 28;
  this.GUTTER_MARGIN = this.INTERSECTION_GAP_SIZE - 3;
  this.BASE_MARGIN = this.INTERSECTION_GAP_SIZE - 10;
  this.hasCoordinates = boardElement.hasAttribute("data-include-coordinates");
  this.MARGIN = this.hasCoordinates ? this.BASE_MARGIN + this.GUTTER_MARGIN : this.BASE_MARGIN;
  this.boardElement = boardElement;
  this.grid = [];
  this.hooks = hooks || {};
  this._options = options || {};
  this._initialized = false;

  if (this._options["fuzzyStonePlacement"]) {
    _utils2.default.addClass(boardElement, "tenuki-fuzzy-placement");
    _utils2.default.removeClass(boardElement, "tenuki-board-flat");
    _utils2.default.addClass(boardElement, "tenuki-board-nonflat");
    this.smallerStones = true;
  }

  this.flatStones = _utils2.default.hasClass(boardElement, "tenuki-board-flat");

  if (!this.flatStones) {
    _utils2.default.addClass(boardElement, "tenuki-board-nonflat");
  }
};

Renderer.hoshiPositionsFor = function (boardSize) {
  var hoshiElements = [];

  if (boardSize < 7) {
    if (boardSize > 1 && boardSize % 2 === 1) {
      var hoshi = {};
      hoshi.top = (boardSize - 1) / 2;
      hoshi.left = hoshi.top;

      hoshiElements.push(hoshi);
    } else {
      // no hoshi
    }
  } else {
    var hoshiOffset = boardSize > 11 ? 3 : 2;

    for (var hoshiY = 0; hoshiY < 3; hoshiY++) {
      for (var hoshiX = 0; hoshiX < 3; hoshiX++) {
        if ((boardSize === 7 || boardSize % 2 === 0) && (hoshiY === 1 || hoshiX === 1)) {
          continue;
        }

        var _hoshi = {};

        if (hoshiY === 0) {
          _hoshi.top = hoshiOffset;
        }

        if (hoshiY === 1) {
          _hoshi.top = (boardSize + 1) / 2 - 1;
        }

        if (hoshiY === 2) {
          _hoshi.top = boardSize - hoshiOffset - 1;
        }

        if (hoshiX === 0) {
          _hoshi.left = hoshiOffset;
        }

        if (hoshiX === 1) {
          _hoshi.left = (boardSize + 1) / 2 - 1;
        }

        if (hoshiX === 2) {
          _hoshi.left = boardSize - hoshiOffset - 1;
        }

        hoshiElements.push(_hoshi);
      }
    }
  }

  return hoshiElements;
};

Renderer.prototype = {
  _setup: function _setup(boardState) {
    var renderer = this;
    var boardElement = this.boardElement;

    renderer.BOARD_LENGTH = 2 * this.MARGIN + (boardState.boardSize - 1) * (this.INTERSECTION_GAP_SIZE + 1);

    var innerContainer = _utils2.default.createElement("div", { class: "tenuki-inner-container" });
    renderer.innerContainer = innerContainer;
    _utils2.default.appendElement(boardElement, innerContainer);

    var zoomContainer = _utils2.default.createElement("div", { class: "tenuki-zoom-container" });
    renderer.zoomContainer = zoomContainer;
    _utils2.default.appendElement(innerContainer, zoomContainer);

    renderer.cancelZoomElement = _utils2.default.createElement("div", { class: "cancel-zoom" });
    var cancelZoomBackdrop = _utils2.default.createElement("div", { class: "cancel-zoom-backdrop" });
    _utils2.default.addEventListener(renderer.cancelZoomElement, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();

      return false;
    });
    _utils2.default.addEventListener(cancelZoomBackdrop, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();

      return false;
    });
    _utils2.default.appendElement(innerContainer, renderer.cancelZoomElement);
    _utils2.default.appendElement(innerContainer, cancelZoomBackdrop);

    // https://developer.mozilla.org/en-US/docs/Web/Events/resize
    var throttle = function throttle(type, name) {
      var running = false;
      var func = function func() {
        if (running) {
          return;
        }

        running = true;

        window.requestAnimationFrame(function () {
          window.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      window.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");

    var specificRendererBoard = this.generateBoard(boardState, {
      hasCoordinates: this.hasCoordinates,
      smallerStones: this.smallerStones,
      flatStones: this.flatStones
    });
    _utils2.default.appendElement(zoomContainer, specificRendererBoard);

    window.requestAnimationFrame(function () {
      // we'll potentially be zooming on touch devices
      zoomContainer.style.willChange = "transform";

      renderer.computeSizing();
    });

    window.addEventListener("optimizedResize", function () {
      renderer.computeSizing();
    });

    renderer.touchmoveChangedTouch = null;
    renderer.touchstartEventHandler = renderer.handleTouchStart.bind(renderer);
    renderer.touchmoveEventHandler = renderer.handleTouchMove.bind(renderer);
    renderer.touchendEventHandler = renderer.handleTouchEnd.bind(renderer);

    _utils2.default.addEventListener(renderer.innerContainer, "touchstart", renderer.touchstartEventHandler);
    _utils2.default.addEventListener(renderer.innerContainer, "touchend", renderer.touchendEventHandler);
    _utils2.default.addEventListener(renderer.innerContainer, "touchmove", renderer.touchmoveEventHandler);
  },

  computeSizing: function computeSizing() {
    var renderer = this;
    var innerContainer = this.innerContainer;
    var zoomContainer = this.zoomContainer;
    var boardElement = this.boardElement;

    // reset everything so we can calculate against new values
    innerContainer.style.height = "";
    innerContainer.style.width = "";
    zoomContainer.style.height = "";
    zoomContainer.style.width = "";
    innerContainer.style.transform = "";
    // zoomContainer.style.willChange = "";
    boardElement.style.width = "";
    boardElement.style.height = "";

    // dev-friendly reset of whether this is a touch device
    renderer._touchEventFired = null;

    innerContainer.style.width = renderer.BOARD_LENGTH + "px";
    innerContainer.style.height = renderer.BOARD_LENGTH + "px";

    zoomContainer.style.width = renderer.BOARD_LENGTH + "px";
    zoomContainer.style.height = renderer.BOARD_LENGTH + "px";

    var scaleX = innerContainer.parentNode.clientWidth / innerContainer.clientWidth;
    var scaleY = innerContainer.parentNode.clientHeight / innerContainer.clientHeight;
    var scale = Math.min(scaleX, scaleY);

    if (scale > 0) {
      if (scale < 1) {
        _utils2.default.addClass(boardElement, "tenuki-scaled");
      } else {
        _utils2.default.removeClass(boardElement, "tenuki-scaled");
      }

      if (scale < 1 || scale > 1) {
        innerContainer.style["transform-origin"] = "top left";
        innerContainer.style.transform = "scale3d(" + scale + ", " + scale + ", 1)";
      }
    }

    // reset the outer element's height to match, ensuring that we free up any lingering whitespace
    boardElement.style.width = innerContainer.getBoundingClientRect().width + "px";
    boardElement.style.height = innerContainer.getBoundingClientRect().height + "px";

    // Work around lack of re-raster in Chrome. See https://github.com/w3c/csswg-drafts/issues/236
    // and https://bugs.chromium.org/p/chromium/issues/detail?id=600482 for more
    // information. This is preventing, e.g., horizontal/vertical line width
    // mismatches after scaling. By adding this, lines are re-rastered and are
    // all the same width, as if the user had hit refresh at the new viewport
    // size.
    zoomContainer.style.willChange = "";

    window.requestAnimationFrame(function () {
      zoomContainer.style.willChange = "transform";
    });
  },

  addIntersectionEventListeners: function addIntersectionEventListeners(element, y, x) {
    var renderer = this;

    _utils2.default.addEventListener(element, "mouseenter", function () {
      var hoveredYPosition = y;
      var hoveredXPosition = x;
      var hoverValue = renderer.hooks.hoverValue(hoveredYPosition, hoveredXPosition);

      if (hoverValue) {
        _utils2.default.addClass(element, "hovered");
        _utils2.default.addClass(element, hoverValue);
      }
    });

    _utils2.default.addEventListener(element, "mouseleave", function () {
      if (_utils2.default.hasClass(this, "hovered")) {
        _utils2.default.removeClass(element, "hovered");
        _utils2.default.removeClass(element, "black");
        _utils2.default.removeClass(element, "white");
      }

      renderer.resetTouchedPoint();
    });

    _utils2.default.addEventListener(element, "click", function () {
      var playedYPosition = y;
      var playedXPosition = x;

      // if this isn't part of a touch,
      // or it is and the user is zoomed in,
      // or it's game over and we're marking stones dead,
      // then don't use the zoom/double-select system.
      if (!renderer._touchEventFired || document.body.clientWidth / window.innerWidth > 1 || renderer.hooks.gameIsOver()) {
        renderer.hooks.handleClick(playedYPosition, playedXPosition);
        return;
      }

      if (renderer.touchedPoint) {
        if (element === renderer.touchedPoint) {
          renderer.hooks.handleClick(playedYPosition, playedXPosition);
        } else {
          renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
        }
      } else {
        renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
      }
    });
  },

  handleTouchStart: function handleTouchStart(event) {
    var renderer = this;
    renderer._touchEventFired = true;

    if (event.touches.length > 1) {
      if (renderer.zoomedIn) {
        event.preventDefault();
      }
      return;
    }

    if (!renderer.zoomedIn) {
      return;
    }

    var xCursor = event.changedTouches[0].clientX;
    var yCursor = event.changedTouches[0].clientY;

    renderer.dragStartX = xCursor;
    renderer.dragStartY = yCursor;
    renderer.zoomContainer.style.transition = "none";
    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },

  handleTouchMove: function handleTouchMove(event) {
    var renderer = this;

    if (event.touches.length > 1) {
      return;
    }

    if (!renderer.zoomedIn) {
      return true;
    }

    // prevent pull-to-refresh
    event.preventDefault();

    renderer.touchmoveChangedTouch = event.changedTouches[0];

    renderer.moveInProgress = true;
  },

  handleTouchEnd: function handleTouchEnd(event) {
    var renderer = this;

    if (event.touches.length > 1) {
      return;
    }

    if (!renderer.zoomedIn) {
      return;
    }

    renderer.zoomContainer.style.transition = "";

    if (!renderer.moveInProgress) {
      return;
    }
    renderer.translateY = renderer.lastTranslateY;
    renderer.translateX = renderer.lastTranslateX;
    renderer.moveInProgress = false;
    renderer.touchmoveChangedTouch = null;
    window.cancelAnimationFrame(renderer.animationFrameRequestID);
  },

  processDragDelta: function processDragDelta() {
    var renderer = this;

    if (!renderer.touchmoveChangedTouch) {
      renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
      return;
    }

    var innerContainer = renderer.innerContainer;

    var xCursor = renderer.touchmoveChangedTouch.clientX;
    var yCursor = renderer.touchmoveChangedTouch.clientY;

    var deltaX = xCursor - renderer.dragStartX;
    var deltaY = yCursor - renderer.dragStartY;

    var translateY = renderer.translateY + deltaY / 2.5;
    var translateX = renderer.translateX + deltaX / 2.5;

    if (translateY > 0.5 * innerContainer.clientHeight - renderer.MARGIN) {
      translateY = 0.5 * innerContainer.clientHeight - renderer.MARGIN;
    }

    if (translateX > 0.5 * innerContainer.clientWidth - renderer.MARGIN) {
      translateX = 0.5 * innerContainer.clientWidth - renderer.MARGIN;
    }

    if (translateY < -0.5 * innerContainer.clientHeight + renderer.MARGIN) {
      translateY = -0.5 * innerContainer.clientHeight + renderer.MARGIN;
    }

    if (translateX < -0.5 * innerContainer.clientWidth + renderer.MARGIN) {
      translateX = -0.5 * innerContainer.clientWidth + renderer.MARGIN;
    }

    renderer.zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";

    renderer.lastTranslateX = translateX;
    renderer.lastTranslateY = translateY;

    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },

  showPossibleMoveAt: function showPossibleMoveAt(intersectionElement, y, x) {
    var renderer = this;
    var boardElement = this.boardElement;
    var zoomContainer = this.zoomContainer;

    renderer.zoomContainerHeight = renderer.zoomContainerHeight || zoomContainer.clientHeight;
    renderer.zoomContainerWidth = renderer.zoomContainerWidth || zoomContainer.clientWidth;

    renderer.touchedPoint = intersectionElement;

    if (_utils2.default.hasClass(boardElement, "tenuki-scaled")) {
      var top = y * (this.INTERSECTION_GAP_SIZE + 1);
      var left = x * (this.INTERSECTION_GAP_SIZE + 1);

      var translateY = 0.5 * renderer.zoomContainerHeight - top - renderer.MARGIN;
      var translateX = 0.5 * renderer.zoomContainerWidth - left - renderer.MARGIN;

      zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";
      renderer.translateY = translateY;
      renderer.translateX = translateX;

      _utils2.default.addClass(renderer.cancelZoomElement, "visible");
      renderer.zoomedIn = true;
    }
  },

  resetTouchedPoint: function resetTouchedPoint() {
    var renderer = this;

    renderer.touchedPoint = null;
  },

  zoomOut: function zoomOut() {
    var renderer = this;

    this.resetTouchedPoint();
    renderer.zoomContainer.style.transform = "";
    renderer.zoomContainer.style.transition = "";
    renderer.dragStartX = null;
    renderer.dragStartY = null;
    renderer.translateY = null;
    renderer.translateX = null;
    renderer.lastTranslateX = null;
    renderer.lastTranslateY = null;

    _utils2.default.removeClass(renderer.cancelZoomElement, "visible");
    renderer.zoomedIn = false;
  },

  render: function render(boardState) {
    var _this = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        territory = _ref2.territory,
        deadStones = _ref2.deadStones;

    if (!this._initialized) {
      this._setup(boardState);
      this._initialized = true;
    }

    this.resetTouchedPoint();

    this.renderStonesPlayed(boardState.intersections);

    var playedPoint = boardState.playedPoint;

    this.updateMarkerPoints({ playedPoint: playedPoint, koPoint: boardState.koPoint });

    if (this._options["fuzzyStonePlacement"] && playedPoint) {
      var verticalShiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none"];

      var horizontalShiftClasses = ["h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];

      var shiftClasses = verticalShiftClasses.concat(horizontalShiftClasses);

      var alreadyShifted = shiftClasses.some(function (c) {
        return _utils2.default.hasClass(_this.grid[playedPoint.y][playedPoint.x], c);
      });

      if (!alreadyShifted) {
        var possibleShifts = _utils2.default.cartesianProduct(verticalShiftClasses, horizontalShiftClasses);

        var _possibleShifts$Math$ = _slicedToArray(possibleShifts[Math.floor(Math.random() * possibleShifts.length)], 2),
            playedVerticalShift = _possibleShifts$Math$[0],
            playedHorizontalShift = _possibleShifts$Math$[1];

        [[-1, 0], [0, -1], [0, 1], [1, 0]].forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              y = _ref4[0],
              x = _ref4[1];

          if (_this.grid[playedPoint.y + y] && _this.grid[playedPoint.y + y][playedPoint.x + x]) {
            var neighboringElement = _this.grid[playedPoint.y + y][playedPoint.x + x];

            if (!_utils2.default.hasClass(neighboringElement, "empty")) {
              [[-1, 0, "v-shift-downdown", "v-shift-up", "v-shift-down"], [-1, 0, "v-shift-downdown", "v-shift-upup", "v-shift-none"], [-1, 0, "v-shift-down", "v-shift-upup", "v-shift-none"], [1, 0, "v-shift-upup", "v-shift-down", "v-shift-up"], [1, 0, "v-shift-upup", "v-shift-downdown", "v-shift-none"], [1, 0, "v-shift-up", "v-shift-downdown", "v-shift-none"], [0, -1, "h-shift-rightright", "h-shift-left", "h-shift-right"], [0, -1, "h-shift-rightright", "h-shift-leftleft", "h-shift-none"], [0, -1, "h-shift-right", "h-shift-leftleft", "h-shift-none"], [0, 1, "h-shift-leftleft", "h-shift-right", "h-shift-left"], [0, 1, "h-shift-leftleft", "h-shift-rightright", "h-shift-none"], [0, 1, "h-shift-left", "h-shift-rightright", "h-shift-none"]].forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 5),
                    requiredYOffset = _ref6[0],
                    requiredXOffset = _ref6[1],
                    requiredNeighborShift = _ref6[2],
                    conflictingPlayedShift = _ref6[3],
                    newNeighborShift = _ref6[4];

                if (y === requiredYOffset && x === requiredXOffset && _utils2.default.hasClass(neighboringElement, requiredNeighborShift) && (playedVerticalShift === conflictingPlayedShift || playedHorizontalShift === conflictingPlayedShift)) {
                  _utils2.default.removeClass(neighboringElement, requiredNeighborShift);
                  _utils2.default.addClass(neighboringElement, newNeighborShift);
                }
              });
            }
          }
        });

        _utils2.default.addClass(this.grid[playedPoint.y][playedPoint.x], playedVerticalShift);
        _utils2.default.addClass(this.grid[playedPoint.y][playedPoint.x], playedHorizontalShift);
      }
    }

    if (deadStones.length > 0 || territory.black.length > 0 || territory.white.length > 0) {
      this.renderTerritory(territory, deadStones);
    }
  },

  renderStonesPlayed: function renderStonesPlayed(intersections) {
    var _this2 = this;

    intersections.forEach(function (intersection) {
      _this2.renderIntersection(intersection);
    });
  },

  updateMarkerPoints: function updateMarkerPoints(_ref7) {
    var playedPoint = _ref7.playedPoint,
        koPoint = _ref7.koPoint;

    var renderer = this;

    if (koPoint) {
      _utils2.default.addClass(renderer.grid[koPoint.y][koPoint.x], "ko");
    }

    if (playedPoint) {
      _utils2.default.addClass(renderer.grid[playedPoint.y][playedPoint.x], "played");
    }
  },

  renderIntersection: function renderIntersection(intersection) {
    var renderer = this;

    var intersectionEl = renderer.grid[intersection.y][intersection.x];

    var classes = ["intersection"];

    if (intersection.isEmpty()) {
      classes.push("empty");
    } else {
      classes.push("occupied");

      if (intersection.isBlack()) {
        classes.push("black");
      } else {
        classes.push("white");
      }

      var shiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none", "h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];

      shiftClasses.forEach(function (shiftClass) {
        if (_utils2.default.hasClass(intersectionEl, shiftClass)) {
          classes.push(shiftClass);
        }
      });
    }

    this.setIntersectionClasses(intersectionEl, intersection, classes);
  },

  renderTerritory: function renderTerritory(territory, deadStones) {
    var _this3 = this;

    _utils2.default.flatten(this.grid).forEach(function (element) {
      _utils2.default.removeClass(element, "territory-black");
      _utils2.default.removeClass(element, "territory-white");
      _utils2.default.removeClass(element, "dead");
    });

    deadStones.forEach(function (point) {
      _utils2.default.addClass(_this3.grid[point.y][point.x], "dead");
    });

    territory.black.forEach(function (territoryPoint) {
      _utils2.default.addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-black");
    });

    territory.white.forEach(function (territoryPoint) {
      _utils2.default.addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-white");
    });
  }
};

exports.default = Renderer;

//# sourceMappingURL=renderer.js.map
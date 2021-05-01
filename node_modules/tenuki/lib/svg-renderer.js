"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _renderer = require("./renderer");

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SVGRenderer = function SVGRenderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  _renderer2.default.call(this, boardElement, { hooks: hooks, options: options });
  _utils2.default.addClass(boardElement, "tenuki-svg-renderer");
};

SVGRenderer.prototype = Object.create(_renderer2.default.prototype);
SVGRenderer.prototype.constructor = SVGRenderer;

var CACHED_CONSTRUCTED_LINES = {};

var constructSVG = function constructSVG(renderer, boardState, _ref2) {
  var hasCoordinates = _ref2.hasCoordinates,
      smallerStones = _ref2.smallerStones,
      flatStones = _ref2.flatStones;

  var cacheKey = [boardState.boardSize, hasCoordinates, smallerStones, flatStones].toString();

  var svg = _utils2.default.createSVGElement("svg");
  var defs = _utils2.default.createSVGElement("defs");
  _utils2.default.appendElement(svg, defs);

  var blackGradient = _utils2.default.createSVGElement("radialGradient", {
    attributes: {
      id: renderer.blackGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils2.default.appendElement(blackGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "hsl(0, 0%, 38%)"
    }
  }));
  _utils2.default.appendElement(blackGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#39363D"
    }
  }));
  _utils2.default.appendElement(defs, blackGradient);

  var whiteGradient = _utils2.default.createSVGElement("radialGradient", {
    attributes: {
      id: renderer.whiteGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils2.default.appendElement(whiteGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "#FFFFFF"
    }
  }));
  _utils2.default.appendElement(whiteGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#fafdfc"
    }
  }));
  _utils2.default.appendElement(defs, whiteGradient);

  var contentsContainer = _utils2.default.createSVGElement("g", {
    attributes: {
      class: "contents",
      transform: "translate(" + renderer.MARGIN + ", " + renderer.MARGIN + ")"
    }
  });
  _utils2.default.appendElement(svg, contentsContainer);

  var lines = void 0;

  if (CACHED_CONSTRUCTED_LINES[cacheKey]) {
    lines = _utils2.default.clone(CACHED_CONSTRUCTED_LINES[cacheKey]);
  } else {
    lines = _utils2.default.createSVGElement("g", {
      attributes: {
        class: "lines"
      }
    });

    for (var y = 0; y < boardState.boardSize - 1; y++) {
      for (var x = 0; x < boardState.boardSize - 1; x++) {
        var lineBox = _utils2.default.createSVGElement("rect", {
          attributes: {
            y: y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            x: x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            width: renderer.INTERSECTION_GAP_SIZE + 1,
            height: renderer.INTERSECTION_GAP_SIZE + 1,
            class: "line-box"
          }
        });

        _utils2.default.appendElement(lines, lineBox);
      }
    }

    CACHED_CONSTRUCTED_LINES[cacheKey] = lines;
  }

  _utils2.default.appendElement(contentsContainer, lines);

  var hoshiPoints = _utils2.default.createSVGElement("g", { attributes: { class: "hoshi" } });
  _utils2.default.appendElement(contentsContainer, hoshiPoints);

  _renderer2.default.hoshiPositionsFor(boardState.boardSize).forEach(function (h) {
    var hoshi = _utils2.default.createSVGElement("circle", {
      attributes: {
        class: "hoshi",
        cy: h.top * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: h.left * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: 2
      }
    });

    _utils2.default.appendElement(hoshiPoints, hoshi);
  });

  if (hasCoordinates) {
    (function () {
      var coordinateContainer = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "coordinates",
          transform: "translate(" + renderer.MARGIN + ", " + renderer.MARGIN + ")"
        }
      });

      var _loop = function _loop(_y) {
        // TODO: 16 is for the rendered height _on my browser_. not reliable...

        [16 / 2 + 1 - (16 + 16 / 2 + 16 / (2 * 2) + 16 / (2 * 2 * 2)), 16 / 2 + 1 + (16 + 16 / 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (verticalOffset) {
          _utils2.default.appendElement(coordinateContainer, _utils2.default.createSVGElement("text", {
            text: boardState.xCoordinateFor(_y),
            attributes: {
              "text-anchor": "middle",
              y: verticalOffset - 0.5,
              x: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5
            }
          }));
        });

        [-1 * (16 + 16 / 2 + 16 / (2 * 2)), 16 + 16 / 2 + 16 / (2 * 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (horizontalOffset) {
          _utils2.default.appendElement(coordinateContainer, _utils2.default.createSVGElement("text", {
            text: boardState.yCoordinateFor(_y),
            attributes: {
              "text-anchor": "middle",
              y: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5 + 16 / (2 * 2),
              x: horizontalOffset - 0.5
            }
          }));
        });

        _utils2.default.appendElement(svg, coordinateContainer);
      };

      for (var _y = 0; _y < boardState.boardSize; _y++) {
        _loop(_y);
      }
    })();
  }

  var intersections = _utils2.default.createSVGElement("g", { attributes: { class: "intersections" } });

  for (var _y2 = 0; _y2 < boardState.boardSize; _y2++) {
    for (var _x = 0; _x < boardState.boardSize; _x++) {
      var intersectionGroup = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "intersection"
        }
      });
      intersectionGroup.setAttribute("data-intersection-y", _y2);
      intersectionGroup.setAttribute("data-intersection-x", _x);
      _utils2.default.appendElement(intersections, intersectionGroup);

      var intersectionInnerContainer = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "intersection-inner-container"
        }
      });
      _utils2.default.appendElement(intersectionGroup, intersectionInnerContainer);

      var intersectionBox = _utils2.default.createSVGElement("rect", {
        attributes: {
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          width: renderer.INTERSECTION_GAP_SIZE,
          height: renderer.INTERSECTION_GAP_SIZE
        }
      });
      _utils2.default.appendElement(intersectionInnerContainer, intersectionBox);

      var stoneRadius = renderer.INTERSECTION_GAP_SIZE / 2;

      if (smallerStones) {
        stoneRadius -= 1;
      }

      var stoneAttributes = {
        class: "stone",
        cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: stoneRadius
      };

      if (!flatStones) {
        _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("circle", {
          attributes: {
            class: "stone-shadow",
            cy: stoneAttributes["cy"] + 2,
            cx: stoneAttributes["cx"],
            r: stoneRadius
          }
        }));
      }

      var intersection = _utils2.default.createSVGElement("circle", {
        attributes: stoneAttributes
      });
      _utils2.default.appendElement(intersectionInnerContainer, intersection);

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("circle", {
        attributes: {
          class: "marker",
          cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          r: 4.5
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("rect", {
        attributes: {
          class: "ko-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          width: 12,
          height: 12
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("rect", {
        attributes: {
          class: "territory-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          width: 11,
          height: 11
        }
      }));

      renderer.grid[_y2] = renderer.grid[_y2] || [];
      renderer.grid[_y2][_x] = intersectionGroup;

      renderer.addIntersectionEventListeners(intersectionGroup, _y2, _x);
    }
  }

  _utils2.default.appendElement(contentsContainer, intersections);

  return svg;
};

SVGRenderer.prototype.generateBoard = function (boardState, _ref3) {
  var hasCoordinates = _ref3.hasCoordinates,
      smallerStones = _ref3.smallerStones,
      flatStones = _ref3.flatStones;

  this.blackGradientID = _utils2.default.randomID("black-gradient");
  this.whiteGradientID = _utils2.default.randomID("white-gradient");

  var svg = constructSVG(this, boardState, { hasCoordinates: hasCoordinates, smallerStones: smallerStones, flatStones: flatStones });

  this.svgElement = svg;
  this.svgElement.setAttribute("height", this.BOARD_LENGTH);
  this.svgElement.setAttribute("width", this.BOARD_LENGTH);

  return svg;
};

SVGRenderer.prototype.computeSizing = function () {
  var _this = this;

  _renderer2.default.prototype.computeSizing.call(this);

  // In addition to the will-change re-raster in Renderer,
  // the SVG element appears to sometimes need this to
  // prevent blurriness on resize.
  this.svgElement.style.transform = "none";

  window.requestAnimationFrame(function () {
    _this.svgElement.style.transform = "";
  });
};

SVGRenderer.prototype.setIntersectionClasses = function (intersectionEl, intersection, classes) {
  if (intersectionEl.getAttribute("class") !== classes.join(" ")) {
    intersectionEl.setAttribute("class", classes.join(" "));
  }

  if (!this.flatStones) {
    if (intersection.isEmpty()) {
      intersectionEl.querySelector(".stone").setAttribute("style", "");
    } else {
      var base = window.location.href.split('#')[0];
      intersectionEl.querySelector(".stone").setAttribute("style", "fill: url(" + base + "#" + this[intersection.value + "GradientID"] + ")");
    }
  }
};

exports.default = SVGRenderer;

//# sourceMappingURL=svg-renderer.js.map
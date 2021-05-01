/**
 * SVGoban
 * styles.js
 *
 */


/**
 * Chosen constants for a top left radial gradient
 */
var SV_GRAD = {
    "cx" : "50%",
    "cy" : "45%",
    "r"  : "60%",
    "fx" : "10%",
    "fy" : "10%"
}

var SV_BW = {
    "black": {
	"start" : "rgb(75,75,75)",
	"stop"  : "rgb(0,0,0)" 
    },
    "white": {
	"start" : "rgb(255,255,255)", 
	"stop"  : "rgb(180,180,180)"
    },
    "red": {
			"start" : "rgb(237,25,85,0.3715861344537815)", 
			"stop"  : "rgb(255,0,84,1)"
		},
    "green": {
			"start" : "rgb(156,237,25,0.3715861344537815)", 
			"stop"  : "rgb(63,255,0,1)"
		},
    "blue": {
			"start" : "rgb(25,177,237,0.3715861344537815)", 
			"stop"  : "rgb(0,114,255,1)"
		},
};

exports.defineRadialColors = function(color) {
    var gradient =  {cx:SV_GRAD.cx, cy:SV_GRAD.cy, r:SV_GRAD.r, fx:SV_GRAD.fx, fy:SV_GRAD.fy};
    return {id:color+"grad", a:SV_BW[color]["start"], z:SV_BW[color]["stop"], gradient:gradient};
}

/**
 * Themes are just CSS rules
 */
exports.Themes = {
    "classic" : function() {
	return `
	    .wood { 
		fill: #b4916c; 
			}
			.redMarker {
		stroke: red !important;
		fill: red !important;
	    }
	    .placeholder { 
		stroke: black;
		opacity: 0 
	    }
    	    .black .placeholder:hover { 
		fill: black;
		stroke: black;
		opacity: 0.2 
	    }
	    .white .placeholder:hover { 
		fill: white;
		stroke: white;
		opacity: 0.2 
	    }
	    .blackstone { 
		fill: url(#blackgrad); 
	    }
	    .whitestone { 
		fill: url(#whitegrad);
	    }
	    .redstone { 
				fill: url(#redgrad) !important;
				stroke: none !important;
				opacity: 0.5;
				r: 4%;
			}
			.greenstone { 
				fill: url(#greengrad) !important;
				stroke: none !important;
				opacity: 0.5;
				r: 4%;
			}
			.bluestone { 
				fill: url(#bluegrad) !important;
				stroke: none !important;
				opacity: 0.5;
				r: 4%;
	    }
	    .onblack {
		stroke: white;
		fill: none;
	    }
	    .onwhite {
		stroke: black;
		fill: none;
	    }
	line, path {
	    stroke: black; 
	}
	text { 
	    font-family: "Ubuntu Light", sans-serif; 
	    font-size: 1.1em; 
	}
	`;
    },
    "night" : function() {
	return `
	    .wood { 
		fill: #425b5b; 
	    }
	    .placeholder { 
		fill: black;
		stroke: black;
		opacity: 0 
	    }
	    .black .placeholder:hover { 
		fill: black;
		stroke: black;
		opacity: 0.2 
	    }
	    .white .placeholder:hover { 
		fill: white;
		stroke: white;
		opacity: 0.2 
	    }
	    .blackstone { 
		fill: #222222; 
	    }
	    .whitestone { 
		fill: #888888;
	    }
	    .onblack {
		stroke: white;
		fill: none;
	    }
	    .onwhite {
		stroke: black;
		fill: none;
	    }
	line, path {
	    stroke: black; 
	}
	text { 
	    font-family: sans-serif; 
	    font-size: 1.1em; 
	}
	`;
    },
    "paper" : function() {
	return `
	    .wood { 
		fill: white; 
	    }
	    .placeholder { 
		fill: black;
		stroke: black;
		opacity: 0 
	    }
	    .black .placeholder:hover { 
		fill: black;
		stroke: black;
		opacity: 0.2 
	    }
	    .white .placeholder:hover { 
		fill: white;
		stroke: black;
		opacity: 0.2 
	    }
	    .blackstone { 
		fill: black; 
		stroke: black;
	    }
	    .whitestone { 
		fill: white;
		stroke: black;
	    }
	    .onblack {
		stroke: white;
		fill: none;
	    }
	    .onwhite {
		stroke: black;
		fill: none;
	    }
	line, path {
	    stroke: black; 
	}
	text { 
	    font-family: sans-serif; 
	    font-size: 1.1em; 
	}
	`;
    }
}


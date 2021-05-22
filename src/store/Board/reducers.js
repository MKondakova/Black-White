import {
  SINGLE_HELP,
  BATTLE_ROYAL_HELP,
  MARKERS_CLEAR,
  MULTIPLE_HELP,
  MAP_HELP,
  ATARI_HELP,
  MAX_GOOD_MOVES,
  WINNER_USER,
  LOSER_USER,
  SET_BLOCKED,
  MAP_STONES,
  SCORES,
  SCORES_WINNER
} from "./types";
import { MAP_HALF, MAP_QUARTERS } from "../../pages/GameBoard/components/Help/types";

const initialState = {
  markers: {},
  classNamesMapStones: {},
  mapStones: {},
  winner: null,
  loser: null,
  blocked: false,
  scores: null,
  scoresWinner: null
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_HELP:
      return {
        ...state,
        markers: action.payload,
        blocked: false
      };
    case BATTLE_ROYAL_HELP:
      var mapStones = {};
      var classNamesMapStones = {};

      if (window.BEST_MOVE_GRID_SIZE_I === undefined) {
        let best_move = action.payload[0].move;
        let i_c = 'ABCDEFGHJKLMNOPQRSTUV'.search(best_move[0]);
        let j_c = parseInt(best_move.replace(best_move[0], '')) - 1;
        console.log(i_c, j_c);

        window.BEST_MOVE = [i_c, j_c];
        window.BEST_MOVE_GRID_SIZE_I = 7;
        window.BEST_MOVE_GRID_SIZE_J = 7;
        let possible_i_j = [];

        for (let i = 0; i <= 6; i++)
          for (let j = 0; j <= 6; j++)
            if (j <= j_c && j_c < j + 7 && i <= i_c && i_c < i + 7)
              possible_i_j.push([i, j]);
        let best_possible_move = possible_i_j[Math.floor(Math.random() * possible_i_j.length)];
        window.BEST_MOVE_GRID_I = best_possible_move[0];
        window.BEST_MOVE_GRID_J = best_possible_move[1];
        window.CAN_MAKE_MOVE = false;

        for (let i = window.BEST_MOVE_GRID_I; i < window.BEST_MOVE_GRID_I + window.BEST_MOVE_GRID_SIZE_I; i++) {
          for (let j = window.BEST_MOVE_GRID_J; j < window.BEST_MOVE_GRID_J + window.BEST_MOVE_GRID_SIZE_J; j++) {
            let alpha = 'ABCDEFGHJKLMNOPQRSTUV';
            let sign = alpha[i];
            let coord = `${sign}${(j + 1)}`;
            mapStones[coord] = "circle"
            classNamesMapStones[coord] = `redstone size-${70}`
          }
        }
      } else {

        while (true) {
          let variant = Math.floor(1 + Math.random() * 4);
          switch (variant) {
            case 1:
              window.BEST_MOVE_GRID_I++;
              window.BEST_MOVE_GRID_SIZE_I--;
              break;
            case 2:
              window.BEST_MOVE_GRID_J++;
              window.BEST_MOVE_GRID_SIZE_J--;
              break;
            case 3:
              window.BEST_MOVE_GRID_SIZE_I--;
              break;
            case 4:
              window.BEST_MOVE_GRID_SIZE_J--;
              break;
              default:
          }
          if (window.BEST_MOVE_GRID_I <= window.BEST_MOVE[0] && window.BEST_MOVE[0] < window.BEST_MOVE_GRID_I + window.BEST_MOVE_GRID_SIZE_I &&
            window.BEST_MOVE_GRID_J <= window.BEST_MOVE[1] && window.BEST_MOVE[1] < window.BEST_MOVE_GRID_J + window.BEST_MOVE_GRID_SIZE_J) {
            break;
          } else {
            switch (variant) {
              case 1:
                window.BEST_MOVE_GRID_I--;
                window.BEST_MOVE_GRID_SIZE_I++;
                break;
              case 2:
                window.BEST_MOVE_GRID_J--;
                window.BEST_MOVE_GRID_SIZE_J++;
                break;
              case 3:
                window.BEST_MOVE_GRID_SIZE_I++;
                break;
              case 4:
                window.BEST_MOVE_GRID_SIZE_J++;
                break;
                default:
            }
          }
        }

        for (let i = window.BEST_MOVE_GRID_I; i < window.BEST_MOVE_GRID_I + window.BEST_MOVE_GRID_SIZE_I; i++) {
          for (let j = window.BEST_MOVE_GRID_J; j < window.BEST_MOVE_GRID_J + window.BEST_MOVE_GRID_SIZE_J; j++) {
            let alpha = 'ABCDEFGHJKLMNOPQRSTUV';
            let sign = alpha[i];
            let coord = `${sign}${(j + 1)}`;
            mapStones[coord] = "circle"
            classNamesMapStones[coord] = `redstone size-${70}`
          }
        }
      }

      return {
        ...state,
        mapStones,
        classNamesMapStones,
        blocked: false
      };
    case SET_BLOCKED:
      return {
        ...state,
        blocked: action.payload
      };
    case MULTIPLE_HELP:
      return {
        ...state,
        markers: {},
        blocked: false
      };
    case MARKERS_CLEAR:
      return {
        ...state,
        markers: {},
        mapStones: {},
        classNamesMapStones: {},
        scores: null,
        scoresWinner: null
      };
    case MAP_STONES:
      return {
        ...state,
        mapStones: action.payload,
        blocked: false
      };
    case MAP_HELP:

      if (action.payload.zone) {
        var {
          mapStones,
          classNamesMapStones
        } = action.payload.isQuarter ? MAP_QUARTERS[action.payload.zone] : MAP_HALF[action.payload.zone];
      } else {
        var mapStones = {};
        var classNamesMapStones = {};
        let alpha = 'ABCDEFGHJKLMNOPQRSTUV';
        action.payload.map((row, rowId) => {
          row.map((cell, colId) => {
            if (parseInt(cell) !== 0) {
              let sign = alpha[rowId];
              let coord = `${sign}${(colId + 1)}`;
              mapStones[coord] = "circle"
              classNamesMapStones[coord] = `redstone size-${cell}`
            }
          })
        })
      }

      return {
        ...state,
        mapStones,
        classNamesMapStones,
        blocked: false
      };
    case WINNER_USER:
      return {
        ...state,
        winner: action.payload
      };
    case LOSER_USER:
      return {
        ...state,
        loser: action.payload
      };
    case SCORES:
      return {
        ...state,
        scores: action.payload,
        blocked: false
      };
    case SCORES_WINNER:
      return {
        ...state,
        scoresWinner: action.payload,
        blocked: false
      };
    case ATARI_HELP:
      var mapStones = {};
      var classNamesMapStones = {};
      if (window.ATARI !== undefined) {
        let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
        window.ATARI.forEach(function (c) {
          let sign = alpha[c[0]];
          let coord = `${sign}${(c[1] + 1)}`;
          mapStones[coord] = "square";
          classNamesMapStones[coord] = `redstone size-40`;
        });
      }

      return {
        ...state,
        mapStones,
        classNamesMapStones,
        blocked: false
      };
    case MAX_GOOD_MOVES:
      let map = [];
      action.payload.map((row, rowId) => {
        map.push([]);
        row.map((cell, colId) => {
          map[rowId].push(cell);
        });
      });

      let max_i, max_j, max_score = -1;
      for (let i = 0; i < 6; i++)
        for (let j = 0; j < 6; j++) {
          let s = 0;

          for (let _i = i; _i < i + 7; _i++)
            for (let _j = j; _j < j + 7; _j++)
              s += map[_i][_j];

          if (s > max_score) {
            max_i = i;
            max_j = j;
            max_score = s;
          }
        }

      let alpha = 'ABCDEFGHJKLMNOPQRSTUV';
      var mapStones = {};
      var classNamesMapStones = {};

      for (let _i = max_i; _i < max_i + 7; _i++)
        for (let _j = max_j; _j < max_j + 7; _j++) {
          let sign = alpha[_i];
          let coord = `${sign}${(_j + 1)}`;
          mapStones[coord] = "circle";
          classNamesMapStones[coord] = `redstone size-60`;
        }

      return {
        ...state,
        mapStones,
        classNamesMapStones,
        blocked: false
      };
    
    default:
      return { ...state };
  }
};

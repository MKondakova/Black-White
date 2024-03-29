import {
  SINGLE_HELP,
  MARKERS_CLEAR,
  MULTIPLE_HELP,
  WINNER_USER,
  LOSER_USER,
  GET_HINT_BEST_MOVES,
  GET_HINT_SHOW_BEST,
  ATARI_HELP,
  GET_HINT_MAX_GOOD_MOVES,
  GET_HINT_HEATMAP_FULL,
  GET_HINT_HEATMAP,
  GET_HINT_HEATMAP_ZONE,
  GET_HINT_BATTLE_ROYAL,
  SET_BLOCKED,
  MAP_STONES,
  GET_SCORES_WINNER,
  GET_HINT_PICK_GOOD_MOVES
} from "./types";

export const hintHeatmapFull = (game_id) => ({
  type: GET_HINT_HEATMAP_FULL,
  payload: {game_id: game_id}
});

export const atariHelp = () => ({
  type: ATARI_HELP,
});

export const maxGoodMoves = (game_id) => ({
  type: GET_HINT_MAX_GOOD_MOVES,
  payload: {game_id: game_id}
});

export const pickGoodMoves = (game_id) => ({
  type: GET_HINT_PICK_GOOD_MOVES,
  payload: {game_id: game_id}
});

export const singleHelp = () => ({
  type: SINGLE_HELP,
});

export const multipleHelp = () => ({
  type: MULTIPLE_HELP,
});

export const markersClear = () => ({
  type: MARKERS_CLEAR,
});

export const setWinnerUser = (winner) => ({
  type: WINNER_USER,
  payload: winner
});

export const setLoserUser = (loser) => ({
  type: LOSER_USER,
  payload: loser
});

export const setBlocked = (blocked) => ({
  type: SET_BLOCKED,
  payload: blocked
});

export const setMapStones = (stones) => ({
  type: MAP_STONES,
  payload: stones
});

export const setScoresWinner = (game_id) => ({
  type: GET_SCORES_WINNER,
  payload: {game_id}
});

export const hintBestMoves = (game_id, count) => ({
  type: GET_HINT_BEST_MOVES,
  payload: {game_id: game_id, count: count}
});

export const hintShowBest = (game_id, moves) => ({
  type: GET_HINT_SHOW_BEST,
  payload: {game_id: game_id, moves: moves}
});

export const hintBattleRoyal = (game_id) => ({
  type: GET_HINT_BATTLE_ROYAL,
  payload: {game_id: game_id, }
});

export const hintHeatmap = (game_id) => ({
  type: GET_HINT_HEATMAP,
  payload: {game_id: game_id}
});

export const hintHeatmapZone = (game_id, isQuarter) => ({
  type: GET_HINT_HEATMAP_ZONE,
  payload: {game_id: game_id, isQuarter}
});



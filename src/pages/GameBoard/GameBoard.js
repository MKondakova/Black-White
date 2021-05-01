import { put } from 'redux-saga/effects';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "./components/Board/Board";
import GameInfo from "./components/GameInfo/GameInfo";
import styled from "styled-components";
import { Header } from "./components/Header";
import Help from "./components/Help/Help";
import {
  hintHeatmapFull,
  hintHeatmapZone,
  atariHelp,
  markersClear,
  multipleHelp,
  setWinnerUser,
  setLoserUser,
  setBlocked,
  hintShowBest,
  setScoresWinner,
  hintBestMoves,
  _7x7Help,
} from "../../store/Board/actions";

import { clearGameId } from "../../store/GameCreate/actions";

import { client, token } from '../../Socket.js'
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
} from "./components/Help/types";
import { ATARI_HELP, _7x7_HELP } from "../../store/Board/types";

const Wrapper = styled.div`
  max-width: 1377px;
  margin: 0 auto;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: stretch;
  height: calc(100vh - 129px);
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(255,255,255,0.5);
  z-index: 99999999;
`;

const GameBoard = ({ history }) => {

  const game_id = useSelector((state) => state.createGame.id);
  const blocked = useSelector((state) => state.board.blocked);
  const mapStones = useSelector((state) => state.board.mapStones);

  const [hint, setHint] = useState(false);
  const [enemyPass, setEnemyPass] = useState(false);
  const [lastMarkers, setLastMarkers] = useState(null);
  const [helpType, setHelpType] = useState('');
  const [activeHelpId, setActiveHelpId] = useState('');
  const [multipleType, setMultipleType] = useState(false);
  const [mapType, setMapType] = useState(false);
  const [multipleHint, setMultipleHint] = useState({});
  const [multipleCount, setMultipleCount] = useState([]);
  const [turns, setTurns] = useState([]);
  const [yourColor, setYourColor] = useState("white");
  const [coordinates, setCoordinates] = useState({});
  const [you, setYou] = useState({});
  const [opponent, setOpponent] = useState({});
  const [stepMain, setStepMain] = useState(0)
  const [stepTwo, setStepTwo] = useState(0)
  const [stepColor, setStepColor] = useState('white')
  const [classNames, setClassNames] = useState({})
  const dispatch = useDispatch();
  const [times, setTimes] = useState({ playerOne: 0, playerTwo: 0 })


  useEffect(() => {
    if (Object.keys(multipleHint).length === multipleCount) {
      dispatch(multipleHelp());
      deleteCoordinates(multipleHint);
      setHelpType('');
      setMultipleHint({});
    }
  }, [multipleHint, multipleCount]);

  if (game_id === null) {
    history.push('/')
  }

  useEffect(() => {
    if (game_id) {
      client.send(JSON.stringify([5, 'go/game']));
      client.send(JSON.stringify([7, "go/game", { command: "auth", token: localStorage.getItem('GoGameToken'), game_id: game_id }]));
    }
  }, [])

  let size = 13;


  function check_atari(moves, color) { // тот, кто ходит сейчас
    if (moves.length < 2)
      return [];

    let set = moves[1];
    let last_set = moves[0];

    function get_group(_set, x, y) {
      let color = _set[y][x];
      let checked = [];

      for (let i = 0; i < size; i++) {
        checked.push([]);
        for (let j = 0; j < size; j++)
          checked[i].push(false)
      }

      checked[y][x] = true;

      function recursion(_set, x, y, checked, color) {
        checked[y][x] = true;
        let coords = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];

        coords.forEach(function (c) {
          if (c[0] >= 0 && c[0] < size && c[1] >= 0 && c[1] < size)
            if (checked[c[0]][c[1]] === false)
              if (color === _set[c[0]][c[1]]) {
                checked[c[0]][c[1]] = true;
                recursion(_set, c[1], c[0], checked, color);
              }
        });
      }

      recursion(_set, x, y, checked, color);

      let stones = [];
      for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
          if (checked[i][j])
            stones.push([j, i]);
      return stones;
    }

    function can_breathe(_set, group) {
      let finished = false;
      for (let i = 0; i < group.length; i++) {
        let coords = [[group[i][1] - 1, group[i][0]], [group[i][1] + 1, group[i][0]], [group[i][1], group[i][0] - 1], [group[i][1], group[i][0] + 1]];
        coords.forEach(function (c) {
          if (c[0] >= 0 && c[0] < size && c[1] >= 0 && c[1] < size && !finished)
            if (_set[c[0]][c[1]] === 0)
              finished = true;
        });

      }

      return finished;
    }

    function can_place(_set, _last_set, x, y, color) {
      if (_set[y][x] != 0)
        return false;

      let set_copy = [];

      for (let i = 0; i < size; i++) {
        set_copy.push([]);
        for (let j = 0; j < size; j++)
          set_copy[i].push(_set[i][j])
      }

      set_copy[y][x] = color;
      let group = get_group(_set, x, y);
      let group_can_breathe = can_breathe(_set, group);
      if (group_can_breathe)
        return true;
      else {
        // мы не можем дышать, надо проверить, получится ли подышать вообще
        let coords = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
        coords.forEach(function (c) {
          if (c[0] >= 0 && c[0] < size && c[1] >= 0 && c[1] < size)
            if (set_copy[c[1]][c[0]] === -color) {
              let new_group = get_group(set_copy, c[0], c[1]);
              if (!can_breathe(set_copy, new_group))
                new_group.forEach(function (_c) {
                  set_copy[_c[1]][_c[0]] = 0;
                });
            }
        });

        group = get_group(set_copy, x, y);
        group_can_breathe = can_breathe(set_copy, group);
        if (!group_can_breathe)
          return false; // вокруг ничего не удалось объесть и мы всё ещё совершаем суицидальный ход
        else {
          for (let i = 0; i < size; i++)
            for (let j = 0; j < size; j++)
              if (set_copy[i][j] !== last_set[i][j])
                return true;

          return false;
        }
      }
    }

    function atari_at_coords(_set, _last_set, x, y, color) {
      let set_copy = [];

      for (let i = 0; i < size; i++) {
        set_copy.push([]);
        for (let j = 0; j < size; j++)
          set_copy[i].push(_set[i][j])
      }

      set_copy[y][x] = color;
      let coords = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
      let atari = false;
      coords.forEach(function (c) {
        if (c[0] >= 0 && c[0] < size && c[1] >= 0 && c[1] < size)
          if (set_copy[c[0]][c[1]] === -color) {
            let new_group = get_group(set_copy, c[1], c[0]);
            if (!can_breathe(set_copy, new_group))
              atari = true;
          }
      });

      return atari;
    }

    let atari_coords = [];

    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (can_place(set, last_set, j, i, -color))
          if (atari_at_coords(set, last_set, j, i, -color)) // вот в этих координатах атари!!!
            atari_coords.push([i, j]);

    return atari_coords;
  }

  function get_last_moves(game_id, TOKEN) {
    let req = new XMLHttpRequest();

    req.open('GET', 'https://go-backend-denis.ambersoft.llc/game/info/' + game_id.toString() + '?token=' + TOKEN, false);
    req.send();
    let moves = JSON.parse(JSON.parse(req.response).log);

    if (moves.length >= 2)
      return [moves[moves.length - 2], moves[moves.length - 1]];
    else if (moves.length === 1)
      return [moves[0]];
    else
      return [];
  }

  client.onmessage = function (e) {
    setEnemyPass(false)
    if (typeof e.data === 'string') {
      let jsonData = JSON.parse(e.data);
      if (jsonData.payload) {
        if (jsonData.payload.type === "currentMap") {
          if (jsonData.payload.player === 'b')
            window.PLAYING_COLOR = 1;
          else
            window.PLAYING_COLOR = -1;
          setYou(jsonData.payload.you)
          setOpponent(jsonData.payload.opponent)
        }
        if (jsonData.payload.currentMap) {
          console.log('проверяю на атари!');
          setCoordinates(mapMap(jsonData.payload.currentMap));
          try {
            let moves = get_last_moves(game_id, token);
            window.ATARI = check_atari(moves, window.PLAYING_COLOR);
            dispatch(atariHelp());
          } catch (e) {
            window.ATARI = null;
            console.log(e);
          }
          // dispatch(_7x7Help(game_id));
          // handleHelp({ type: "map", id: _7x7Help });
        }
        if (jsonData.payload.player) {
          if (typeof jsonData.payload.player === 'string') {
            setYourColor(jsonData.payload.player === 'w' ? 'white' : 'black')
          }
        }
        if (jsonData.payload.type && (jsonData.payload.type === 'endGame')) {
          let winner = jsonData.payload.winnerPlayer
          let loser = jsonData.payload.loserPlayer
          winner.finalScore = jsonData.payload.finalScore;
          dispatch(setWinnerUser(winner))
          dispatch(setLoserUser(loser))
          history.push('/', { from: "Win" })
          dispatch(clearGameId())
        }
        if (jsonData.payload.turn) {
          setStepColor(jsonData.payload.turn)
        }
        if (jsonData.payload.move) {
          setTurns(turns => [...turns, timeConverter(jsonData.time) + ': ' + jsonData.payload.move])
        }
        if (jsonData.payload.type === 'newTurn') {
          // if (window.PLAYING_COLOR === 1 && jsonData.payload.turn === 'black' || window.PLAYING_COLOR === -1 && jsonData.payload.turn === 'white') {
          //   console.log('проверяю на атари!');
          // }
          setLastMarkers({ [jsonData.payload.place]: 'circle' })
        }
        if (jsonData.payload.moveType === 'pass') {
          if (stepColor !== yourColor) {
            setEnemyPass(true)
          }
        }
        if (jsonData.payload.turnBlackEndedAt && jsonData.payload.turnWhiteEndedAt) {
          setTimes({
            playerOne: Math.floor((Number(jsonData.payload.turnBlackEndedAt) - new Date().getTime()) / 1000),
            playerTwo: Math.floor((Number(jsonData.payload.turnWhiteEndedAt) - new Date().getTime()) / 1000)
          })
        }
      }
    }
    dispatch(setBlocked(false))
  };

  const mapMap = (map) => {
    let coords = {};
    let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
    map.map((row, rowId) => row.map((cell, colId) => {
      if (cell !== 0) {
        let sign = alpha[rowId];
        coords[`${sign}${(colId + 1)}`] = cell === -1 ? 'white' : 'black';
      }
    }))
    let steMainTemp = 0
    let stepTwoTemp = 0
    Object.keys(coords).forEach((key) => {
      if (String(yourColor) === String(coords[key])) {
        steMainTemp += 1
      } else {
        stepTwoTemp += 1
      }
    })
    setStepMain(steMainTemp)
    setStepTwo(stepTwoTemp)
    return coords;
  }

  const move = (coord) => {
    if (stepColor === yourColor) {
      dispatch(markersClear());
      setActiveHelpId(null);
      setHelpType('')
      dispatch(setBlocked(true))
      client.send(JSON.stringify([7, "go/game", { command: "move", token: token, place: coord.toString().toLowerCase(), game_id: game_id }]));
    }
  }

  const pass = () => {
    dispatch(markersClear());
    setActiveHelpId(null);
    setHelpType('')
    dispatch(setBlocked(true))
    client.send(JSON.stringify([7, "go/game", { command: "pass", token: token, game_id: game_id }]));
  }

  const resign = () => {
    dispatch(setBlocked(true))
    client.send(JSON.stringify([7, "go/game", { command: "resign", token: token, game_id: game_id }]));
  }

  const handleHelp = ({ type, multipleHandleCount, id, count }) => {
    dispatch(markersClear());
    setMultipleHint({});
    setActiveHelpId(id);
    if (type === "single") {
      dispatch(setBlocked(true))
      setHelpType("single");
      dispatch(hintBestMoves(game_id, count));
    }
    if (type === "multiple") {
      setHelpType("multiple");
      setMultipleType("multiple");
      setMultipleCount(multipleHandleCount);
    }
    if (type === "map") {
      dispatch(setBlocked(true))
      setHelpType("map");
      setMapType("map");
      switch (id) {
        case HEATMAP_FULL:
          dispatch(hintHeatmapFull(game_id));
          break;
        case HEATMAP_ZONE_QUARTER:
          dispatch(hintHeatmapZone(game_id, true));
          break;
        case _7x7Help:
          dispatch(_7x7Help(game_id));
          break;
      }
    }
    if (type === "score") {
      dispatch(setBlocked(true))
      dispatch(setScoresWinner(game_id))
    }
  };

  const deleteCoordinates = (hints) => {
    for (const key in coordinates) {
      for (const keyHint in hints) {
        if (key === keyHint) {
          delete coordinates[key];
        }
      }
    }
  }

  const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp);
    let year = a.getFullYear().toString().substr(-2);
    let month = ('0' + (a.getMonth() + 1)).slice(-2);
    let date = ('0' + a.getDate()).slice(-2);
    let hour = ('0' + a.getHours()).slice(-2);
    let min = ('0' + a.getMinutes()).slice(-2);
    let time = `${date}/${month}/${year} ${hour}:${min}`;
    return time;
  }

  const setMultipleHintFunc = (val) => {
    if (Object.keys(mapStones).length === (multipleCount - 2)) {
      dispatch(markersClear());
      setActiveHelpId(null);
      setMultipleHint({})
      setHelpType('');
      dispatch(setBlocked(true))
      dispatch(hintShowBest(game_id, Object.keys({ ...mapStones, [val]: 'circle' })))
    } else {
      setMultipleHint(mapStones)
    }
  }

  return (
    <Wrapper>
      <Header
        hint={hint}
        setPass={pass}
        viewPass={Object.keys(coordinates).length > 0}
        history={history}
        setHint={(e) => setHint(e)}
        setResign={resign}
        helpType={helpType}
        gameId={game_id}
        view={stepColor === yourColor}
        timeOut={() => alert('End Time')}
        timer={stepColor === yourColor}
      />
      <Flex>
        {blocked && (
          <Wrap />
        )}
        <Board
          lastMarkers={lastMarkers}
          hint={hint}
          setHint={setHint}
          currentColor={stepColor}
          setCurrentColor={setStepColor}
          yourColor={yourColor}
          helpType={helpType}
          setMultipleHint={(val) => setMultipleHintFunc(val)}
          multipleHint={multipleHint}
          multipleCount={multipleCount}
          coordinates={coordinates}
          setStonePosition={move}
          setHelpType={setHelpType}
          setMapType={setMapType}
          setMultipleType={setMultipleType}
          setActiveHelpId={setActiveHelpId}
          classNames={classNames}
          mapStones={mapStones}
        />
        {!hint ? (
          <GameInfo
            you={you}
            opponent={opponent}
            stepColor={stepColor}
            yourColor={yourColor}
            turns={turns}
            enemyPass={enemyPass}
            stepMain={stepMain}
            times={times}
            stepTwo={stepTwo} />
        ) : (
          <Help
            you={you}
            opponent={opponent}
            stepColor={stepColor}
            yourColor={yourColor}
            turns={turns}
            enemyPass={enemyPass}
            stepMain={stepMain}
            stepTwo={stepTwo}
            currentColor={yourColor}
            setHint={setHint}
            handleHelp={handleHelp}
            helpType={helpType}
            multipleType={multipleType}
            mapType={mapType}
            activeHelpId={activeHelpId}
            times={times}
            scores={stepColor !== yourColor ? false : true}
          />
        )}
      </Flex>
    </Wrapper>
  );
};

export default GameBoard;

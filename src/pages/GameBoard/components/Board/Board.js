import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Goban } from "react-goban";
import styled from "styled-components";
import { markersClear, setMapStones, hintBattleRoyale } from "../../../../store/Board/actions";
import { client } from "../../../../Socket";

const Wrapper = styled.div`
  width: 50%;
  position: relative;
  & > div {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const Board = ({
  lastMarkers,
  socket,
  setHint,
  currentColor,
  setCurrentColor,
  yourColor,
  helpType,
  setMultipleHint,
  multipleHint,
  coordinates,
  setCoordinates,
  setHelpType,
  setMultipleType,
  setActiveHelpId,
  setMapType,
  setStonePosition,
  classNames,
  mapStones
}) => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.board.markers);
  const classNamesMapStones = useSelector(
    (state) => state.board.classNamesMapStones
  );

  const handleTurn = (stonePosition) => {
    client.send(JSON.stringify([7, "go/game", { command: "move", token: "1cfc52aacaba0507e66d74cd878020f071457220", place: stonePosition.toString().toLowerCase(), game_id: 8 }]));
    let valid = true;
    for (const key in coordinates) {
      if (key === stonePosition) {
        valid = false;
      }
    }

    if (valid && currentColor === yourColor) {
      if (window.BEST_MOVE_GRID_SIZE_I !== undefined && window.BEST_MOVE_GRID_SIZE_I !== null) {
        let i_c = 'ABCDEFGHJKLMNOPQRSTUV'.search(stonePosition[0]);
        let j_c = parseInt(stonePosition.replace(stonePosition[0], '')) - 1;
        let move_is_out_of_bounds = true;

        if (window.BEST_MOVE_GRID_I <= i_c && i_c < window.BEST_MOVE_GRID_I + window.BEST_MOVE_GRID_SIZE_I && window.BEST_MOVE_GRID_J <= j_c && j_c < window.BEST_MOVE_GRID_J + window.BEST_MOVE_GRID_SIZE_J)
          move_is_out_of_bounds = false;

        if (window.BEST_MOVE[0] === i_c && window.BEST_MOVE[1] === j_c || move_is_out_of_bounds) {
          window.BEST_MOVE_GRID_SIZE_I = undefined; // то есть вышли из режима баттл рояля
          window.CAN_MAKE_MOVE = true;
        } else {
          setHint(false);
          dispatch(markersClear());
          setHelpType("");
          setActiveHelpId("");
          setMultipleType(false);
          setMapType(false);
          dispatch(hintBattleRoyale(window.GAME_ID));
          window.CAN_MAKE_MOVE = false;
        }
      }

      if (window.CAN_MAKE_MOVE === undefined || window.CAN_MAKE_MOVE === true) {
        setStonePosition(stonePosition)
        setCurrentColor(currentColor === "white" ? "black" : "white");
        setHint(false);
        dispatch(markersClear());
        setHelpType("");
        setActiveHelpId("");
        setMultipleType(false);
        setMapType(false);
      } else {
        dispatch(setMapStones({ ...mapStones }))
      }
    }
  };

  const handleMultipleTurn = (stonePosition) => {
    let valid = true;
    for (const key in coordinates) {
      if (key === stonePosition) {
        valid = false;
      }
    }
    if (valid) {
      dispatch(setMapStones({ ...mapStones, [stonePosition]: 'circle' }))
      setMultipleHint(stonePosition);
      //setCoordinates({ ...coordinates, [stonePosition]: currentColor });
    }
  };

  let className;
  if (currentColor !== yourColor) {
    className = 'disabled'
  } else {
    className = ''
  }

  return (
    <Wrapper className={className}>
      <Goban
        style={{ position: "absolute" }}
        stones={coordinates}
        markers={markers}
        lastMarkers={lastMarkers}
        mapStones={mapStones}
        classNamesMapStones={classNamesMapStones}
        onIntersectionClick={
          helpType !== "multiple" ? handleTurn : handleMultipleTurn
        }
        nextToPlay={yourColor}
      />
    </Wrapper>
  );
};

export default Board;

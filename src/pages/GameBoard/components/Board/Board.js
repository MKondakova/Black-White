import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Goban } from "react-goban";
import styled from "styled-components";
import { markersClear, setMapStones } from "../../../../store/Board/actions";
import { client } from "../../../../Socket";

const Wrapper = styled.div`
  grid-area: board;
  @media (min-width: 1000px) {
    width: calc(100vh - 80px);
  }
  @media (max-width: 1000px) {
    width: 100vw;
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
    client.send(JSON.stringify([7, "go/game", {command: "move", token: "1cfc52aacaba0507e66d74cd878020f071457220", place: stonePosition.toString().toLowerCase(), game_id: 8}]));
    let valid = true;
    for (const key in coordinates) {
      if (key === stonePosition) {
        valid = false;
      }
    }
    if (valid && currentColor === yourColor) {
      setStonePosition(stonePosition)
      //setCoordinates({ ...coordinates, [stonePosition]: currentColor });
      setCurrentColor(currentColor === "white" ? "black" : "white");
      setHint(false);
      dispatch(markersClear());
      setHelpType("");
      setActiveHelpId("");
      setMultipleType(false);
      setMapType(false);
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

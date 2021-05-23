import React from "react";
import styled from "styled-components";
import { strings } from "../../../../language";
import { ATARI_HELP, BATTLE_ROYAL_HELP, } from "../../../../store/Board/types";
import {
  HEATMAP_ZONE_QUARTER,
  MAX_GOOD_MOVES,
  PICK_GOOD_MOVES,
} from "./types";

const Wrapper = styled.div`
  margin:0 10px;
`;

const HelpWrapper = styled.div`
  grid-area: help;
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

const Atari = styled.div`
text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
font-family: "Roboto", sans-serif;
display: block;
outline: none;
flex-shrink: 0;
border-radius: 5px;
background-image: none;
border-style: solid;
border-width: 1px;
cursor: pointer;
font-size: ${(props) => (props.fontSize ? props.fontSize : "28px")};

&:focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
`
const HelpItem = styled(Atari)`
color: #222233;
border-color: #222233;
background-color: transparent;

&:hover {
  color: #fff;
  background-color: #222233;
  border-color: #222233;
}
`;

const Help = ({
  handleHelp,
  activeHelpId,
  scores,
}) => {
  let classListAtari = "";
  if (!window.ATARI_DISABLED) {
    classListAtari = "atari-sel"
  } else {
    classListAtari = "atari-unsel"
  }
  return (
    <Wrapper>
      <HelpWrapper>
        <Atari id="atari" title={strings.hintTitleAtari} className={classListAtari}
          onClick={(e) => {
            window.ATARI_DISABLED = window.ATARI_DISABLED ? false : true;
            e.currentTarget.classList.toggle('atari-sel')
            e.currentTarget.classList.toggle('atari-unsel')

            if (!window.ATARI_DISABLED)
              scores && handleHelp({ type: "atari" });
            else
              handleHelp({ type: "atari_clear" });

          }}
        >
          {strings.hintAtari}
        </Atari>
          <HelpItem title={strings.hintTitleBestOf3}
          active={activeHelpId === 16}
          onClick={() =>
            scores &&
            handleHelp({ type: "multiple", multipleHandleCount: 4, id: 16 })
          }
        >
          {strings.hintBestOf3}
        </HelpItem>
          <HelpItem title={strings.hintTitleBestMoveQuarter}

          active={activeHelpId === HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER })
          }
          >
          {strings.hintBestMoveQuarter}
        </HelpItem>

          <HelpItem title={strings.hintTitleWinner}
          active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "score", id: 34 })}
        >
          {strings.hintWinner}
        </HelpItem>

        <HelpItem title={strings.hintTitleGoodMovesArea}
          onClick={() => scores && handleHelp({ type: "map", id: MAX_GOOD_MOVES })}

        >
          {strings.hintGoodMovesArea}
        </HelpItem>
        <HelpItem title={strings.hintTitleBestMove}
          onClick={() => scores && handleHelp({ type: "battle", id: 0 })}
        >
        {strings.hintBestMove}
        </HelpItem>

        <HelpItem title={strings.hintTitlePickGoodMove}
          onClick={() => scores && handleHelp({ type: "map", id: PICK_GOOD_MOVES })}
        >
          {strings.hintPickGoodMove}
        </HelpItem>
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;

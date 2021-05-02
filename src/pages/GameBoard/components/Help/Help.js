import React from "react";
import styled from "styled-components";
import { ATARI_HELP, BATTLE_ROYALE_HELP } from "../../../../store/Board/types";
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
  _7X7_HELP
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
const Checkbox = styled.div`
text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
font-family: "Roboto", sans-serif;
display: block;
outline: none;
flex-shrink: 0;
border-radius: 5px;
color: #343a40;
border-color: #343a40;
background-color: transparent;
background-image: none;
border-style: solid;
border-width: 1px;
cursor: pointer;
font-size: ${(props) => (props.fontSize ? props.fontSize : "28px")};
&:hover {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}
&:focus {
  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
}

  width: 48%;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;

`
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
color: #343a40;
border-color: #343a40;
background-color: transparent;

&:hover {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
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
        <Atari id="atari" className={classListAtari}
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
          Атари
        </Atari>
        <HelpItem title="Стоимость - 2"
          active={activeHelpId === 16}
          onClick={() =>
            scores &&
            handleHelp({ type: "multiple", multipleHandleCount: 4, id: 16 })
          }
        >
          Показать лучший из заданных 3 ходов
        </HelpItem>
        <HelpItem title="Стоимость - 2"
          active={activeHelpId === HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER })
          }
        >
          В какой четверти доски сейчас лучший ход?
        </HelpItem>
        <HelpItem title="Стоимость - 2"
          active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "score", id: 34 })}
        >
          Кто побеждает на данный момент?
        </HelpItem>
        <HelpItem
          onClick={() => scores && handleHelp({ type: "map", id: _7X7_HELP })}
        >
          В какой области хороший ход?
        </HelpItem>
        <HelpItem
          onClick={() => scores && handleHelp({ type: "battle", id: BATTLE_ROYALE_HELP })}
        >
          Королевская битва!
        </HelpItem>
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;

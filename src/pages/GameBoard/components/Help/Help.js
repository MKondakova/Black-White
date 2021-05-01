import React from "react";
import styled from "styled-components";
import { ATARI_HELP, BATTLE_ROYALE_HELP } from "../../../../store/Board/types";
import Players from "../GameInfo/components/Players/Players";
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
  _7X7_HELP
} from "./types";

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
`;

const HelpWrapper = styled.div`
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const HelpItem = styled.div`
  width: 48%;
  margin-bottom: 10px;
  background: ${(props) => (props.active ? "#D8AD63" : "#f6f6f6")};
  padding: 10px;
  cursor: pointer;
`;

const Help = ({
    enemyPass,
    stepColor,
    yourColor,
    you,
    opponent,
    stepMain,
    stepTwo,
    handleHelp,
    activeHelpId,
    scores,
    times
  }) => {
  return (
    <Wrapper>
      <Players
        enemyPass={enemyPass}
        opponent={opponent}
        you={you}
        stepColor={stepColor}
        yourColor={yourColor}
        stepMain={stepMain}
        stepTwo={stepTwo}
        times={times}
      />
      <HelpWrapper>
        <HelpItem
          active={activeHelpId === 1}
          onClick={() =>
            scores && handleHelp({ type: "single", id: 1, count: 1 })
          }
        >
          Лучший ход
        </HelpItem>
        <HelpItem
          active={activeHelpId === HEATMAP_FULL}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_FULL })
          }
        >
          Тепловая карта всей доски. Детализированная
        </HelpItem>
        <HelpItem
          active={activeHelpId === 16}
          onClick={() =>
            scores &&
            handleHelp({ type: "multiple", multipleHandleCount: 4, id: 16 })
          }
        >
          Показать лучший из заданных 3 ходов
        </HelpItem>
        <HelpItem
          active={activeHelpId === HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER })
          }
        >
          В какой четверти доски сейчас лучший ход?
        </HelpItem>
        <HelpItem
          active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "score", id: 34 })}
        >
          Кто побеждает на данный момент?
        </HelpItem>
        <HelpItem
          // active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "atari", id: ATARI_HELP })}
        >
          Атари
        </HelpItem>
        <HelpItem
          // active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "map", id: _7X7_HELP })}
        >
          В какой области хороший ход?
        </HelpItem>
        <HelpItem
          // active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "battle", id: BATTLE_ROYALE_HELP })}
        >
          Королевская битва!
        </HelpItem>
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;

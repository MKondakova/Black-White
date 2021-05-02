import React from "react";
import styled from "styled-components";
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
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
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const Checkbox = styled.div `
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

const HelpItem = styled.div`
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
`;

const Help = ({
    handleHelp,
    activeHelpId,
    scores,
  }) => {
  return (
    <Wrapper>
      <HelpWrapper>
      <HelpItem title="Стоимость - 2"
          active={activeHelpId === HEATMAP_FULL}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_FULL })
          }
        >
          Тепловая карта всей доски. Детализированная
        </HelpItem>
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
        <HelpItem title="Стоимость - 2"
          active={activeHelpId === 1}
          onClick={() =>
            scores && handleHelp({ type: "single", id: 1, count: 1 })
          }
        >
          Лучший ход
        </HelpItem>
        <Checkbox>
          <input type="checkbox" id="scales" name="atari"
                style={{width: 24 , height: 24, marginRight: 5 }}/>
          <label for="atari">Atari</label>
        </Checkbox>
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;

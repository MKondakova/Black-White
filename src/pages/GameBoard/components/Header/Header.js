import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { strings } from "../../../../language"

const Wrapper = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 29px;
  min-height: 85px;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 64px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.p`
  font-size: 24px;
  line-height: 28px;
  margin-right: 32px;
  cursor: pointer;
`;
const TextHint = styled.p`
  font-size: 24px;
  line-height: 28px;
  margin-right: 32px;
  cursor: pointer;
  color: ${(props) => (props.hint ? "#686868" : "#000")};
`;

const TextSdf = styled.p`
  font-size: 24px;
  line-height: 28px;
  cursor: pointer;
  color: #FFD700	;
  &:hover {
    color: #FFD700	;
  }
`;
const GameId = styled.p`
  font-size: 24px;
  margin-right: 50px;
  line-height: 28px;
`;
const Timer = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #191970	;
`;

let timesCal = null;

export const Header = ({ history, gameId, setHint, hint, setResign, helpType, setPass, viewPass, view }) => {

  return (
    <Wrapper>
      <Content>
        <Left>
          <Menu>
            {view && (
              <Text onClick={() => setPass()}>{strings.pass}</Text>
            )}
            <Text onClick={() => setResign()}>{ strings.giveup }</Text>
            {view && (
              <TextHint onClick={() => setHint(!hint)} hint={hint}>{strings.takeHints}</TextHint>
            )}
            <Text onClick={()=>window.open(strings.rulesLink,'_blank')}>{strings.rules}</Text>
          </Menu>
        </Left>
        <GameId>{strings.id}: {gameId}</GameId>
      </Content>
    </Wrapper>
  );
};

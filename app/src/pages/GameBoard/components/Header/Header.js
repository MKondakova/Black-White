import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../../../assets/img/logo_game.png";
import {MAIN_URL} from '../../../../constants/routes'

const Wrapper = styled.div`
  display: flex;
  height: 66px;
  align-items: center;
  margin-bottom: 34px;
  padding-top: 29px;
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
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Logotype = styled.img`
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
  color: ${(props) => (props.hint ? "#D8AD63" : "#000")};
`;

const TextSdf = styled.p`
  font-size: 24px;
  line-height: 28px;
  cursor: pointer;
  color: #aaaaaa;
  &:hover {
    color: #000000;
  }
`;
const GameId = styled.p`
  font-size: 24px;
  line-height: 28px;
`;
const Timer = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #767676;
`;

let timesCal = null;

export const Header = ({ history, gameId, setHint, hint, setResign, helpType, setPass, viewPass, view }) => {

  return (
    <Wrapper>
      <Content>
        <Left>
          <LogoWrapper onClick={() => history.push(MAIN_URL)}>
            <Logotype alt="logo" src={Logo} />
          </LogoWrapper>
          <Menu>
            {viewPass && (
              <Text onClick={() => setPass()}>Пас</Text>
            )}
            <Text onClick={() => setResign()}>Сдаться</Text>
            {view && (
              <TextHint onClick={() => setHint(!hint)} hint={hint}>Взять подсказку</TextHint>
            )}
          </Menu>
        </Left>
        <GameId>ID игры: {gameId}</GameId>
      </Content>
    </Wrapper>
  );
};

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import AvatarImage from "../../../../assets/img/avatar-2.png";
import { GAME_URL } from "../../../../constants/routes";

const Text = styled.p`
  font-size: 36px;
  line-height: 42px;
  margin-bottom: 30px;
  text-align: center;
`;

const Enemy = styled.div`
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.p`
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
`;

const ScoreWrapper = styled.div`
  display: flex;
`;

const Pts = styled.p`
  font-size: 20px;
  color: #c1c1c1;
`;

const Avatar = styled.img`
  border-radius: 100px;
`;

export const Connect = ({ text, history, opponent }) => {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 1) {
      history.push(GAME_URL)
    }
  }, [seconds]);

  return (
    <>
      <Enemy>
        <Info>
          <Avatar alt="avatar" src={opponent.avatar} />
          <Name>{opponent.nickname}</Name>
          <ScoreWrapper>
            <Pts>{opponent.pts}</Pts>
            <Pts>\</Pts>
            <Pts>{opponent.position+'th'}</Pts>
          </ScoreWrapper>
        </Info>
      </Enemy>
      <Text>{text}</Text>
      <ButtonCustom width={'350px'} disabled>Отмена</ButtonCustom>
    </>
  );
};

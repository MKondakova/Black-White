import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  grid-area: players;
`;
const Player = styled.div`
  display: flex;
  width: 50%;
  padding: 20px 10px;
  background: ${(props) => (props.active ? "#222233" : "#F5F5DC")};
  color: ${(props) => (props.active ? "#F5F5DC" : "#222233")};
  border: ${(props) => (props.winner ? "4px solid green" : "0px")};
  margin-top:40px;
  position: relative;
`;
const PlayerRight = styled(Player)`
  justify-content: flex-end;
`;
const Avatar = styled.img`
  border-radius: 100px;
  width: 95px;
  margin-right: 15px;
  border: 6px solid #F5F5DC;
`;
const AvatarRight = styled.img`
  border-radius: 100px;
  width: 95px;
  margin-left: 15px;
  border: 6px solid #222233;
`;
const Info = styled.div``;
const Name = styled.p`
  color: #F5F5DC;
  font-size: 24px;
`;

const NameRight = styled.p`
  color: #222233;
  font-size: 24px;
`;
const PtsRight = styled.p`
  color: #222233;
  font-size: 18px;
`;
const Pts = styled.p`
  color: #F5F5DC;
  font-size: 18px;
`;
const Score = styled.p`
  color: #F5F5DC;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const ScoreRight = styled.p`
  color: #222233;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
const Treangle = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  position: absolute;
  content: "";
  right: 0;
  top: 36px;
  border: 28px solid transparent;
  border-right: 38px solid #a4a4a4;
`;
const TreangleRight = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  position: absolute;
  content: "";
  left: 0;
  top: 36px;
  border: 28px solid transparent;
  border-left: 38px solid #a4a4a4;
`;
const Scores = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
  color: green;
`;

const Pass = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 10px;
  color: #aaaaaa;
`;
const PassRight = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 10px;
  color: #aaaaaa;
`;

const Time = styled.div`
  color: #aaaaaa;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  right: 50px;
`;
const TimeRight = styled.p`
  color: #aaaaaa;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  left: 50px;
`;

let timesPlayerOneCall = null
let timesPlayerTwoCall = null

const Players = ({ yourColor, enemyPass, stepColor, you, opponent, stepMain, stepTwo, times }) => {

  const scores = useSelector((state) => state.board.scores);
  const winner = useSelector((state) => state.board.scoresWinner);

  const [timerParseOne, setTimerParseOne] = useState('')
  const [timerParseTwo, setTimerParseTwo] = useState('')

  useEffect(async () => {
    await clearTimeout(timesPlayerOneCall)
    await clearTimeout(timesPlayerTwoCall)
    timesPlayerOne(times.playerOne, stepColor === 'black')
    timesPlayerTwo(times.playerTwo, stepColor === 'white')
  }, [times])

  const timesPlayerOne = (t, start) => {
    if (t >= 0) {
      timesPlayerOneCall = setTimeout(() => {
        const time = t - 1
        const hours = Math.floor(t / 60 / 60);
        const minutes = Math.floor(t / 60) - (hours * 60);
        const seconds = Math.floor(t % 60);
        setTimerParseOne(`${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        if (start) {
          timesPlayerOne(time, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerOneCall)
    }
  }

  const timesPlayerTwo = (t, start) => {
    if (t >= 0) {
      timesPlayerTwoCall = setTimeout(() => {
        const time = t - 1
        const hours = Math.floor(t / 60 / 60);
        const minutes = Math.floor(t / 60) - (hours * 60);
        const seconds = Math.floor(t % 60);
        setTimerParseTwo(`${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        if (start) {
          timesPlayerTwo(time, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerTwoCall)
    }
  }

  return (
    <Wrapper>
      <Player active={yourColor === "black"} winner={winner && (winner.winner === 'B')}>
        <Avatar alt="avatar" src={yourColor === 'black' ? you.avatar : opponent.avatar} />
        <Info>
          <Name>{yourColor === 'black' ? you.nickname : opponent.nickname}</Name>
          <Pts>{yourColor === 'black' ? you.pts : opponent.pts}/{yourColor === 'black' ? you.position+'th' : opponent.position+'th'}</Pts>
          {scores && (scores.winner === 'B') && (
            <Scores>
              + {scores.score}
            </Scores>
          )}
        </Info>
        { enemyPass && yourColor !== 'black' && (<Pass>Пас</Pass>)}
        <Time>{timerParseOne}</Time>
        <Score>{stepMain}</Score>
        <Treangle active={stepColor === "black"} />
      </Player>
      <PlayerRight active={yourColor === "white"} winner={winner && (winner.winner === 'W')}>
        <Info>
          <NameRight>{yourColor !== 'white' ? opponent.nickname : you.nickname}</NameRight>
          <PtsRight>{yourColor !== 'white' ? opponent.pts : you.pts}/{yourColor !== 'white' ? opponent.position+'th' : you.position+'th'}</PtsRight>
          {scores && (scores.winner === 'W') && (
            <Scores>
              + {scores.score}
            </Scores>
          )}
        </Info>
        { enemyPass && yourColor !== 'white' && (<PassRight>Пас</PassRight>)}
        <TimeRight>{timerParseTwo}</TimeRight>
        <ScoreRight>{stepTwo}</ScoreRight>
        <AvatarRight alt="avatar" src={yourColor !== 'white' ? opponent.avatar : you.avatar} />
        <TreangleRight active={stepColor === "white"} />
      </PlayerRight>
    </Wrapper>
  );
};

export default Players;

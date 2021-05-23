import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { strings } from "../../../../../../language";

const Wrapper = styled.div`
  display: flex;
  min-width:550px;
  min-height: 150px;
  grid-area: players;
`;
const Player = styled.div`
  display: flex;
  width: 50%;
  padding: 20px 10px;
  background:#222233;
  color: white;
  border: 2px solid #222233;
  margin-top:40px;
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 5px;
`;
const PlayerRight = styled(Player)`
  background: white;
  color: #222233;
  justify-content: flex-end;
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 0;
`;
const Avatar = styled.img`
  border-radius: 100px;
  width: 95px;
  margin-right: 15px;
  border: ${(props) => (props.winner ? "4px solid green" : "6px solid white")};

`;
const AvatarRight = styled.img`
  border-radius: 100px;
  width: 95px;
  margin-left: 15px;
  border: ${(props) => (props.winner ? "4px solid green" : "6px solid #222233")};

`;
const Info = styled.div``;
const Name = styled.p`
  z-index:2;
  color: white;
  font-size: 24px;
`;

const NameRight = styled.p`
  z-index:2;
  color: #222233;
  font-size: 24px;
`;
const PtsRight = styled.p`
  color: #222233;
  font-size: 18px;
`;
const Pts = styled.p`
  color: white;
  font-size: 18px;
`;
const Score = styled.p`
  color: white;
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
  border-right: 38px solid white;
`;
const TreangleRight = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  position: absolute;
  content: "";
  left: 2px;
  top: 36px;
  border: 28px solid transparent;
  border-left: 38px solid #222233;
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
  color:white;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  right: 50px;
`;
const TimeRight = styled.p`
  color: #222233;
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
        <Avatar alt="avatar" src={yourColor === 'black' ? you.avatar : opponent.avatar} 
                      winner={winner && (winner.winner === 'B')} />
        <Info>
          <Name>{yourColor === 'black' ? you.nickname : opponent.nickname}</Name>
          <Pts>{yourColor === 'black' ? you.pts : opponent.pts}/{yourColor === 'black' ? you.position+'th' : opponent.position+'th'}</Pts>
          {scores && (scores.winner === 'B') && (
            <Scores>
              + {scores.score}
            </Scores>
          )}
        </Info>
        { enemyPass && yourColor !== 'black' && (<Pass>{strings.pass}</Pass>)}
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
        <AvatarRight alt="avatar" src={yourColor !== 'white' ? opponent.avatar : you.avatar}
         winner={winner && (winner.winner === 'W')} />
        <TreangleRight active={stepColor === "white"} />
      </PlayerRight>
    </Wrapper>
  );
};

export default Players;

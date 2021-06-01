import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { useSelector } from "react-redux";
import { strings } from "../../../../language"

const Text = styled.p`
  font-size: 36px;
  line-height: 42px;
  text-align: center;
`;

const ScoreText = styled.p`
  white-space: nowrap;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  display: flex;
  margin-top: 15px;
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
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
  max-width: 50%;
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
`;

const Score = styled.p`
  font-size: 36px;
  line-height: 42px;
  font-weight: 700;
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
`;
const ScoreAfter = styled(Score)`
  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 3px;
    background: #ffc164;
    bottom: 0;
  }
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
  width: 150px;
`;

export const Winner = ({setSearchType}) => {
  const [player, setPlayer] = useState({})

  const userId = useSelector((state) => state.profile.userProfile.user.id);
  const winner = useSelector((state) => state.board.winner);
  const loser = useSelector((state) => state.board.loser);

  if(!winner) {
    setSearchType('')
  }

  useEffect(()=>{
    if (winner?.id === userId) {
      setPlayer(winner)
    } else {
      setPlayer(loser)
    }
  },[winner, loser])

  return (
    <>
      <Enemy>
        <Info>
          <Avatar alt="avatar" src={player?.avatar} />
          <Name>{player?.nickname}</Name>
          <ScoreWrapper>
            <Pts>{player?.pts}</Pts>
            <Pts>\</Pts>
            <Pts>{player?.position+'th'}</Pts>
          </ScoreWrapper>
        </Info>
      </Enemy>
      <Text>{winner?.id === userId ? strings.youWin : strings.youLose}</Text>
      <ScoreText>{strings.score}: <ScoreAfter>{player?.finalScore}</ScoreAfter></ScoreText>
      <ScoreText>{strings.scoreByHints}: <ScoreAfter>{player?.hintScore}</ScoreAfter></ScoreText>
      <ScoreText>{strings.scoreFinal}: <ScoreAfter>{player?.rpScore}</ScoreAfter></ScoreText>
      <ButtonCustom
        width="327px"
        mt={30}
        mb={30}
        onClick={() => {
          setSearchType("");
        }}
      >
      {strings.menu}
      </ButtonCustom>
    </>
  );
};

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ButtonCustom } from "../../components/ButtonCustom";
import { Input } from "../../components/InputCustom";
import { MAIN_URL } from "../../constants/routes";
import { getProfile, getSgf, getFullLog } from "../../store/Profile/actions";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  align-items: start;
  width: 100%;
  padding: 20px 0;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 635px;
  width: 100%;
  margin-bottom: 70px;
`;
const InfoPlayer = styled.div``;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const GameHistory = styled.div`
  height: auto;
  min-height: 200px;
  overflow: hidden;
  max-width: 635px;
  width: 100%;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  
  border-radius: 100px;
  width: 200px;
  margin-bottom: 20px
`;
const Name = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`;
const Pts = styled.p`
  color: #343a40;
  font-size: 12px;
  line-height: 14px;
`;
const Span = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #343a40;
`;
const ScoreLeft = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: #343a40;
  margin-right: 5px;
`;
const ScoreRight = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: #343a40;
  margin-left: 5px;
  margin-right: 16px;
`;
const AvatarHistory = styled.img`
  
  width: 90px;
  margin-right: 15px;
`;

const ButtonDownloadFile = styled.div`
  width: 90px;
  font-weight: 400;
  text-align: center;
  font-family: "Roboto",sans-serif;
  heigth: 60px;
  height: 20px;
  display: block;
  outline: none;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background-color: #343a40;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  border: none;
  :first-child {
    margin-bottom: 15px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameHistoryItem = styled.div`
  height: 120px;
  width: 100%;
  background: transparent;
  color: #343a40;
  background-color: transparent;
  background-image: none;
  border-color: #343a40;
  border-width: 1px;
  outline: 1px solid #343a40;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const InfoHistory = styled.div``;



const Profile = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const playerInfo = useSelector((state) => state.profile.userProfile.user);

  const gameHistoryItems =
    playerInfo?.games_history.map((item, i) => {
      return item.scoreOpponent <= item.score ? (
          <GameHistoryItem key={i} winner>
            <Left>
              <AvatarHistory alt="avatar" src={item.player.avatar} />
              <InfoHistory>
                <Name>{item.player.nickname}</Name>
                <Pts>{item.player.pts} / {item.player.position+'th'}</Pts>
              </InfoHistory>
            </Left>
            <Right>
              <Span winner>Победа</Span>
              <ScoreRight winner>{"+"+item.score}</ScoreRight>
            </Right>
            <ButtonRow>
              <ButtonDownloadFile onClick={()=>dispatch(getSgf(item.game_id))}>
                Файл
              </ButtonDownloadFile>
              <ButtonDownloadFile onClick={()=>dispatch(getFullLog(item.game_id))}>
                Лог
              </ButtonDownloadFile>
            </ButtonRow>
          </GameHistoryItem>) : (
          <GameHistoryItem key={i}>
            <Left>
              <AvatarHistory alt="avatar" src={item.player.avatar} />
              <InfoHistory>
                <Name>{item.player.nickname}</Name>
                <Pts>{item.player.pts} / {item.player.position+'th'}</Pts>
              </InfoHistory>
            </Left>
            <Right>
              <Span>Поражение</Span>
              <ScoreRight>{item.score}</ScoreRight>
            </Right>
            <ButtonRow>
              <ButtonDownloadFile onClick={()=>dispatch(getSgf(item.game_id))}>
                Файл
              </ButtonDownloadFile>
              <ButtonDownloadFile onClick={()=>dispatch(getFullLog(item.game_id))}>
                Лог
              </ButtonDownloadFile>
            </ButtonRow>
          </GameHistoryItem>
      )
    });

  return (
    <Wrapper>
      <Info>
        <ButtonCustom
            width="400px"
            mb="20"
            onClick={() => {
              history.push(MAIN_URL);
            }}
          >
            Назад
        </ButtonCustom>
        <Avatar alt="avatar" src={playerInfo?.avatar} />
        <InfoPlayer>
          <Input
            mb={10}
            textAlign="center"
            disabled
            value={playerInfo?.nickname}
          />
          <Input
            mb={10}
            textAlign="center"
            disabled
            value={playerInfo?.email}
          />
          <Input mb={10} textAlign="center" disabled value={"Cчет: " + playerInfo?.pts} />
        </InfoPlayer>
        <ButtonCustom
            width="400px"
            textAlign="center"
            mb="20"
            onClick={() => {
              history.push(MAIN_URL);
            }}
          >
            Выход
        </ButtonCustom>
      </Info>
      <GameHistory>
        {gameHistoryItems}
      </GameHistory>
      
    </Wrapper>
  );
};

export default Profile;

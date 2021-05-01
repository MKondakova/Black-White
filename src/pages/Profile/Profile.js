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
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 100px 0;
`;
const Info = styled.div`
  display: flex;
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
  overflow-y: scroll;
  max-width: 635px;
  width: 100%;
  margin-bottom: 70px;
`;

const Avatar = styled.img`
  border-radius: 100px;
  width: 200px;
`;
const Name = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`;
const Pts = styled.p`
  color: #c8d7b5;
  font-size: 12px;
  line-height: 14px;
`;
const Span = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => (props.winner ? "#C8D7B5" : "#B69094")};
`;
const ScoreLeft = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: ${(props) => (props.winner ? "#C8D7B5" : "#DD3F65")};
  margin-right: 5px;
`;
const ScoreRight = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: ${(props) => (props.winner ? "#86C13A" : "#B69094")};
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
  padding: 0;
  height: 20px;
  display: block;
  outline: none;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background-color: #FFE3BA;
  color: #000;
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
  height: 117px;
  width: 100%;
  background: ${(props) => (props.winner ? "#efffda" : "#FFDADE")};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const InfoHistory = styled.div``;

const TriangleLeft = styled.div`
  border: 20px solid transparent;
  border-right: 20px solid ${(props) => (props.winner ? "#C8D7B5" : "#DD3F65")};
  margin-right: 16px;
`;
const TriangleRight = styled.div`
  border: 20px solid transparent;
  border-left: 20px solid ${(props) => (props.winner ? "#86C13A" : "#B69094")};
  margin-right: 16px;
`;

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
              <TriangleLeft winner />
              <ScoreLeft winner>{item.scoreOpponent}</ScoreLeft>
              <Span winner>/</Span>
              <ScoreRight winner>{item.score}</ScoreRight>
              <TriangleRight winner />
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
              <TriangleLeft />
              <ScoreLeft>{item.scoreOpponent}</ScoreLeft>
              <Span>/</Span>
              <ScoreRight>{item.score}</ScoreRight>
              <TriangleRight/>
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
          <Input mb={10} textAlign="center" disabled value={playerInfo?.pts} />
        </InfoPlayer>
      </Info>
      <GameHistory>
        {gameHistoryItems}
      </GameHistory>
      <ButtonCustom
        width="400px"
        onClick={() => {
          history.push(MAIN_URL);
        }}
      >
        В меню
      </ButtonCustom>
    </Wrapper>
  );
};

export default Profile;

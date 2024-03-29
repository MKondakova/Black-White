import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ButtonCustom } from "../../components/ButtonCustom";
import { removeToken } from "../../helpers/session.js"
import { MAIN_URL } from "../../constants/routes";
import { getProfile, getSgf, getFullLog } from "../../store/Profile/actions";
import { strings } from "../../language";

const Wrapper = styled.div`
  display: grid;
  @media (max-width: 1000px) {
    grid-template-areas:
    "info"
    "history";
  }
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
    "info history";
  }
  height: 100vh;
  position: relative;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;
const Info = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 150px;
  margin-bottom: 70px;
`;
const InfoPlayer = styled.div``;

const Left = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const GameHistory = styled.div`
  grid-area: history;
  @media (max-width: 1000px) {
    height: fit-content;
    min-height: 200px;
  }
  @media (min-width: 1000px) {
    height: 90vh;
    min-height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }
  margin: 0 15px 0 15px;
  min-width: 150px;
`;

const Avatar = styled.img`
  border-radius: 100px;
  width: 200px;
  margin-bottom: 20px
`;
const Name = styled.p`
  text-overflow: ellipsis;
  overflow:hidden;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`;
const Pts = styled.p`
  color: #222233;
  font-size: 12px;
  line-height: 14px;
`;
const Span = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #222233;
`;
const ScoreLeft = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: #222233;
  margin-right: 5px;
`;
const ScoreRight = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: #222233;
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
  display: block;
  outline: none;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background-color: #222233;
  border-radius: 5px;
  color: white;
  padding: 5px;
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

const InfoText = styled.div `
  margin-bottom: 10px;
  font-size: 28px;
  margin: 15px;
`

const GameHistoryItem = styled.div`
  min-height: 120px;
  width: 100%;
  color: #222233;
  border-color: #222233;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin: 10px 20px 0px 0px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-y: hidden;
  overflow-x: auto;
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
              <Span winner>{strings.win}</Span>
              <ScoreRight winner>{"+"+item.score}</ScoreRight>
            </Right>
            <ButtonRow>
              <ButtonDownloadFile onClick={()=>dispatch(getSgf(item.game_id))}>
                {strings.file}
              </ButtonDownloadFile>
              <ButtonDownloadFile onClick={()=>dispatch(getFullLog(item.game_id))}>
              {strings.log}
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
              <Span>{strings.defeat}</Span>
              <ScoreRight>{item.score}</ScoreRight>
            </Right>
            <ButtonRow>
              <ButtonDownloadFile onClick={()=>dispatch(getSgf(item.game_id))}>
              {strings.file}
              </ButtonDownloadFile>
              <ButtonDownloadFile onClick={()=>dispatch(getFullLog(item.game_id))}>
              {strings.log}
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
            {strings.back}
        </ButtonCustom>
        <Avatar alt="avatar" src={playerInfo?.avatar} />
        <InfoPlayer>
          <InfoText>
              {playerInfo?.nickname}
            </InfoText>
          <InfoText>
            { playerInfo?.email }
          </InfoText>
          <InfoText>
            {strings.score}: { playerInfo?.pts }
          </InfoText>
          <InfoText>
            {strings.place}: { playerInfo?.position }
          </InfoText>
        </InfoPlayer>
        <ButtonCustom
            width="400px"
            textAlign="center"
            mb="20"
            onClick={() => {
              removeToken()
              history.push(MAIN_URL);
            }}
          >
            {strings.exit}
        </ButtonCustom>
      </Info>
      <GameHistory>
        {gameHistoryItems}
      </GameHistory>
      
    </Wrapper>
  );
};

export default Profile;

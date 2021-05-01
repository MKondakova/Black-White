import React from "react";
import styled from "styled-components";
import Logo from "../../../../assets/img/logo.png";
import AvatarImage from "../../../../assets/img/avatar.png";
import { MAIN_URL, PROFILE_URL } from "../../../../constants/routes";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { Input } from "../../../../components/InputCustom";

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 35px;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  width: 100%;
  top: 0;
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const RightContent = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const RightSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: no-wrap;
  cursor: pointer;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Logotype = styled.img`
  display: none;
  width: 405px;
  height: auto;
  margin-right: 14px;
`;

const Name = styled.p`
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
`;

const ScoreWrapper = styled.div`
  display: center;
`;

const Pts = styled.p`
  font-size: 20px;
  line-height: 23px;
  color: #5b5b5b;
`;

const Avatar = styled.img`
  border-radius: 100px;
  margin-left: 20px;
  width: 115px;
`;

const Search = styled.img`
  border-radius: 100px;
  margin-left: 20px;
  width: 115px;
`;

export const Header = ({
  history,
  setSearchType,
  searchType,
  nickname,
  pts,
  winrate,
  avatar,
  profile,
  setNicknameFunc
}) => (
  <Wrapper>
    {!profile ? (
      <Right>
        <RightContent onClick={() => {
          if (searchType !== "ConnectRandom" && searchType !== "ConnectCode") {
            history.push(PROFILE_URL);
            setSearchType("");
          }
        }}>
          <Info>
            <Name>{nickname || ""}</Name>
            <ScoreWrapper>
              <Pts style={{ marginRight: 16 }}>{pts || 0}pts</Pts>
              <Pts>{winrate || ""}</Pts>
            </ScoreWrapper>
          </Info>
          <Avatar alt="avatar" src={avatar} />
        </RightContent>
      </Right>
    ) : (
      <RightSearch>
        <Input
          onChange={(e) => setNicknameFunc(e)}
          width="500px"
          mr={40}
          textAlign="left"
          placeholder="Введите ник или номер игрока"
        />
        <ButtonCustom width="auto" onClick={() => {
          history.push(MAIN_URL)
          setSearchType("")
        }} padding="0 20px">
          Меню
        </ButtonCustom>
      </RightSearch>
    )}
  </Wrapper>
);

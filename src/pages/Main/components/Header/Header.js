import React from "react";
import styled from "styled-components";
import Pupa from "../../../../assets/img/magnifier_icon-icons.com_56922.svg";
import { MAIN_URL, PROFILE_URL } from "../../../../constants/routes";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { Input } from "../../../../components/InputCustom";
import { strings } from "../../../../language"

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 20px 8px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  align-items: flex-end;
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
  border-radius: 25px;
  margin: 20px;
  width: 60px;

  filter: grayscale(100%);
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

          <Avatar alt="avatar" src={avatar} />
          <Info>
            <ScoreWrapper>
              <Pts style={{ marginRight: 16 }}>{pts || 0} pts</Pts>
            </ScoreWrapper>
          </Info>
        </RightContent>
      </Right>
    ) : (
      <RightSearch>
        <ButtonCustom 
        width="auto"
        mr="20"
        onClick={() => {
          history.push(MAIN_URL)
          setSearchType("")
        }} padding="10px 20px">
            {strings.menu}
        </ButtonCustom>
        <Input
          onChange={(e) => setNicknameFunc(e)}
          mr={20}
          textAlign="left"
          placeholder={strings.search}
        />
        <img src={Pupa} 
        onClick={() => {
          setSearchType("")
        }}
        alt={strings.pupa}></img>
      </RightSearch >
    )}
  </Wrapper>
);

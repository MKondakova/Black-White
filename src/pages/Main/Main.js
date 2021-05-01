import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import styled from "styled-components";
import { getProfile } from "../../store/Profile/actions";
import { getCurrentGame } from "../../store/GameCreate/actions";

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 170px;
`;

const Main = ({ history, location }) => {
  const [searchType, setSearchType] = useState(location.state?.from ? location.state.from : '');
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.profile.userProfile.user);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getCurrentGame());
  }, [])

  if(!playerInfo) {
    return null;
  }

  return (
    <Wrapper>
      <Header
        history={history}
        setSearchType={setSearchType}
        searchType={searchType}
        nickname={playerInfo.nickname}
        pts={playerInfo.pts}
        avatar={playerInfo.avatar}
        winrate={playerInfo.winrate}
      />
      <Content
        history={history}
        searchType={searchType}
        setSearchType={setSearchType}
      />
    </Wrapper>
  );
};

export default Main;

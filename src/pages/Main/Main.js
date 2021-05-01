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
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
      <Content
        history={history}
        searchType={searchType}
        setSearchType={setSearchType}
      />
    </Wrapper>
  );
};

export default Main;

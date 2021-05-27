import React from "react";
import styled from "styled-components";
import Info from './components/Info/Info'

const Wrapper = styled.div`
  margin:0 10px;
  display: flex;
  max-height:100%;
  flex-direction: column
`;


const GameInfo = ({ turns}) => {
  return (
    <Wrapper>
      <Info turns={turns}/>
    </Wrapper>
  );
};

export default GameInfo;

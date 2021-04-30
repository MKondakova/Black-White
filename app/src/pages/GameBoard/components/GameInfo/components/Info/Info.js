import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 23px;
  min-height: 508px;
  overflow-y: scroll;
`;
const TextBlock = styled.div`
  background: #f7f7f7;
  padding: 20px 40px;
`;
const Text = styled.p`
  font-size: 18px;
`;

const Info = ({turns}) => {
  return (
    <Wrapper>
      <TextBlock>
        {turns.map((item)=>{
          return <Text>{item}</Text>
        })}
      </TextBlock>
    </Wrapper>
  );
};

export default Info;

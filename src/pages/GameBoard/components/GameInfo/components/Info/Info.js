import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: info;
  margin-top: 23px;
  min-height: 508px;
  overflow-y: scroll;
`;
const TextBlock = styled.div`
  background: transparent;
  padding: 20px 40px;
`;
const TextWhite = styled.p`
  font-size: 18px;
  background: transparent;
  border-radius:10px;
  border: 2px solid #222233;
  margin:5px;
  padding: 10px;
  color: #222233;
`;

const TextBlack = styled.p`
  font-size: 18px;
  background: #222233;
  border-radius:10px;
  margin:5px;
  padding: 10px;
  color: #FFFAFA;
`;


const Info = ({turns}) => {
  return (
    <Wrapper>
      <TextBlock>
        {turns.map((item)=>{
          let colorIndex=item.lastIndexOf('(')
          if (item[colorIndex+1]==='ч'){
            const text = item.slice(0,colorIndex)+item.slice(colorIndex+'черные) '.length)
            return <TextBlack>{text}</TextBlack>
          } else {
            const text = item.slice(0,colorIndex)+item.slice(colorIndex+'белые) '.length)
            return <TextWhite>{text}</TextWhite>
          }
        })}
      </TextBlock>
    </Wrapper>
  );
};

export default Info;

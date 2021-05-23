import React, { useEffect } from "react";
import styled from "styled-components";
import { strings } from "../../../../../../language";

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
          let text = ''

          if (item[colorIndex+1]==='ч'){
            text = item.slice(0,colorIndex)+item.slice(colorIndex+'черные) '.length)
          } else {
            text = item.slice(0,colorIndex)+item.slice(colorIndex+'белые) '.length)
          }
          
          let nickAndTime = text.slice(0, text.lastIndexOf('с')-1)
          const pos = text.slice(text.lastIndexOf(' ')+1);
          
          if (pos.length > 3){
            nickAndTime = nickAndTime.slice(0, nickAndTime.lastIndexOf('с')-1)
            if (item[colorIndex+1]==='ч'){ 
              return <TextBlack>{nickAndTime}{strings.playerPassed}</TextBlack>
            }
            return <TextWhite>{nickAndTime}{strings.playerPassed}</TextWhite>
          }
          if (item[colorIndex+1]==='ч'){ 
            return <TextBlack>{nickAndTime}{strings.makeMove}{pos}</TextBlack>
          }
          return <TextWhite>{nickAndTime}{strings.makeMove}{pos}</TextWhite>

        })}
      </TextBlock>
    </Wrapper>
  );
};

export default Info;

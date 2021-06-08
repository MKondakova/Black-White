import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../Main/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getLiders } from "../../store/Profile/actions";
import  image  from "../../assets/img/up-arrow-svgrepo-com.svg"
import { strings } from "../../language";

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0;
`;

const LidersCont = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Lider = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  align-items: center;
  padding: 0 20px;
`;

const LiderImg = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
`;
const Name = styled.div`
  width: 30%;
  position: relative;
  display: flex;
  align-items: center;
  :after{
    content: '';
    width: 100%;
    height: 0.5px;
    background: #000000;
    position: absolute;
    left: 0;
    z-index: -1;
  }
`;
const Place = styled.div `
  width: auto;
  font-weight: bold;
  padding: 0 10px;
  font-size: 25px;
  background-color: #FFF;
  z-index: 10;
  margin-end:5px;
`;
const SubName = styled.div`
  width: auto;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  padding: 0 10px;
  font-size: 20px;
  background-color: #FFF;
  z-index: 10;
`;
const Rating = styled.div`
  width: 20%;
  font-size: 20px;
  position: relative;
  display: flex;
  align-items: center;
  :after{
    content: '';
    width: 100%;
    height: 0.5px;
    background: #000000;
    left: 0;
    z-index: 0;
  }
`;
const Rate = styled.div`
  width: auto;
  color: #797979;
  background-color: #FFF;
  position: relative;
  z-index: 10;
  padding: 0 10px;
`;
const Scores = styled.div`
  width: 8%;
  font-size: 22px;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;
const Red = styled.div`
  color: red;
`;
const Green = styled.div`
  color: green;
`;

export const Liders = ({ history }) => {

  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('')
  const [list, setList] = useState([])
  const liders = useSelector((state) => state.profile.liders);

  useEffect(() => {
    dispatch(getLiders())
  }, [])

  useEffect(() => {
    if (nickname && (nickname !== '')) {
      setList(liders.filter(item => item.nickname.indexOf(nickname) !== -1 || item.position === Number.parseInt(nickname)));
    } else {
      setList(liders)
    }
  }, [nickname, liders])

  return (
    <Wrapper>
      <Header
        history={history}
        profile={true}
        setSearchType={() => console.log()}
        setNicknameFunc={(val) => setNickname(val)}
      />

      <a href="#" title={strings.upTitle}>
          <img src={image} style={{position:'fixed',
              bottom:50,
              right:50
              }} alt={strings.upTitle} >
          </img>
      </a>
      <LidersCont>
        {
          list.map((item, i) => {
            return (
              <Lider key={i}>
                <Place>{item.position}.</Place>
                <LiderImg src={item.avatar} />
                <Name>
                  <SubName>
                    {item.nickname}
                  </SubName>
                </Name>
                <Rating>
                  <Rate>
                    {item.pts}pts
                  </Rate>
                </Rating>
                <Scores>
                  <Green>
                    {item.winrate.split('/')[0]}
                  </Green>
                  &nbsp;/&nbsp;
                  <Red>
                    {item.winrate.split('/')[1]}
                  </Red>
                </Scores>
              </Lider>
            )
          })
        }
      </LidersCont>
    </Wrapper>
  );
};

export default Liders;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../Main/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getLiders } from "../../store/Profile/actions";

const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: flex-start;
  padding-top: 200px;
`;

const LidersCont = styled.div`
  width: 100%;
  max-height: 590px;
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
const SubName = styled.div`
  width: auto;
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
    position: absolute;
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
      setList(liders.filter(item => item.nickname.indexOf(nickname) !== -1 || item.id.toString().indexOf(nickname) !== -1));
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
      <LidersCont>
        {
          list.map((item, i) => {
            return (
              <Lider key={i}>
                <LiderImg src={item.avatar} />
                <Name>
                  <SubName>
                    {item.id} - {item.nickname}
                  </SubName>
                </Name>
                <Rating>
                  <Rate>
                    {item.pts}pts / {item?.position}th
                  </Rate>
                </Rating>
                <Scores>
                  <Red>
                    {item.winrate.split('/')[0]}
                  </Red>
                  &nbsp;/&nbsp;
                  <Green>
                    {item.winrate.split('/')[1]}
                  </Green>
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

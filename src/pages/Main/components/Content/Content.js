import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { CodeContent } from "../CodeContent";
import { Connect } from "../Connect";
import { LoadingGame } from "../LoadingGame";
import { Winner } from "../Winner";
import { Error } from "../Error";
import { INFO_URL } from "../../../../constants/routes";
import { createRandomGame, createGameWithAi } from "../../../../store/GameCreate/actions";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 613px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentMainBoard = (setSearchType, searchType, history, gameId) => {
  const [opponent, setOpponent] = useState({})
  const [code, setCode] = useState('')

  switch (searchType) {
    case "Code":
      return <CodeContent gameId={gameId} setSearchType={setSearchType} />;

    case "Random":
      return (
        <LoadingGame
          gameId={gameId}
          setSearchType={setSearchType}
          text="Ожидание случайного соперника"
          setOpponent={setOpponent}
          searchType={searchType}
          />
      );

    case "CodeEnter":
      return (
        <LoadingGame
          gameId={gameId}
          setSearchType={setSearchType}
          setOpponent={setOpponent}
          code={code}
          text="Ожидание второго игрока"
          searchType={searchType}
        />
      );

    case "ConnectRandom":
      return (
        <Connect
          history={history}
          opponent={opponent}
          setSearchType={setSearchType}
          text="Противник найден!"
        />
      );

    case "ConnectCode":
      return (
        <Connect
          history={history}
          opponent={opponent}
          setSearchType={setSearchType}
          text="Игрок подключился!"
        />
      );

    case "Win":
      return <Winner setSearchType={setSearchType} />;

    case "Error":
      return (
        <Error
          error="Не удалось подключиться к запрашиваемой игре"
          setSearchType={setSearchType}
        />
      );

    default:
  }
};

export const Content = ({ history, searchType, setSearchType }) => {
  const dispatch = useDispatch();
  const gameId = useSelector(state => state.createGame.id);

  useEffect(async ()=>{
    if (searchType === "Random") await dispatch(createRandomGame())
    if (searchType === "WithAi") await dispatch(createGameWithAi())
  }, [searchType])

  return (
    <Wrapper>
      {!searchType ? (
        <>
          <ButtonCustom mb={30} onClick={() => history.push('/gameBoard')} disabled={gameId === null}>
            Продолжить игру
          </ButtonCustom>
          <ButtonCustom mb={30} onClick={() => setSearchType("Random")} disabled={gameId !== null}>
            Игра со случайным соперником
          </ButtonCustom>
          <ButtonCustom mb={30} onClick={() => setSearchType("WithAi")} disabled={gameId !== null}>
            Игра с ИИ
          </ButtonCustom>
          <ButtonCustom onClick={() => setSearchType("Code")} mb={30} disabled={gameId !== null}>
            Закрытая игра
          </ButtonCustom>
          <ButtonCustom mb={30} onClick={() => history.push('/liders')}>Рейтинг игроков</ButtonCustom>{" "}
          <ButtonCustom
            onClick={() => {
              history.push(INFO_URL);
              setSearchType("");
            }}
          >
            Информация для участников
          </ButtonCustom>{" "}
        </>
      ) : null}
      {ContentMainBoard(setSearchType, searchType, history, gameId)}
    </Wrapper>
  );
};

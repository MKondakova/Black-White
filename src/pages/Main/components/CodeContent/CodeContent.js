import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import { Input } from "../../../../components/InputCustom";
import { clearGameId, createGameCode, joinGameWithCode } from "../../../../store/GameCreate/actions";
import { client, token } from "../../../../Socket";
import { strings } from "../../../../language";

const Text = styled.p`
  font-size: 36px;
  line-height: 42px;
  text-align: center;
`;

const CustomCodeContent = ({ setSearchType, setContentType }) => (
  <>
    <Text>«{strings.closePlay}»</Text>
    <ButtonCustom mt={40} mb={30} onClick={() => setContentType("CreateGame")}>
      {strings.create}
    </ButtonCustom>
    <ButtonCustom mb={30} onClick={() => setContentType("JoinGame")}>
      {strings.join}
    </ButtonCustom>
    <ButtonCustom onClick={() => setSearchType("")}>{strings.cancel}</ButtonCustom>
  </>
);

const CreateGame = ({ setSearchType, cancelGame, code }) => (
  <>
    <Text>Код вашей игры:</Text>
    <Input value={code || 'Ожидайте'} textAlign="center" disabled mt={40} mb={30} />
    <ButtonCustom mb={30} onClick={() => setSearchType("CodeEnter")}>
      Начать игру
    </ButtonCustom>
    <ButtonCustom onClick={() => cancelGame()}>{strings.cancel}</ButtonCustom>
  </>
);

const JoinGame = ({ setSearchType, cancelGame, code, setCode }) => (
  <>
    <Text>Укажите код игры:</Text>
    <Input mt={30} mb={30} onChange={setCode} name="code" />
    <ButtonCustom
      mb={30}
      disabled={!code}
      onClick={() => code && setSearchType("CodeEnter")}
    >
      {strings.join}
    </ButtonCustom>
    <ButtonCustom onClick={() => cancelGame()}>{strings.cancel}</ButtonCustom>
  </>
);

export const CodeContent = ({ gameId, setSearchType }) => {
  const [code, setCode] = useState("");
  const [contentType, setContentType] = useState("");
  const dispatch = useDispatch();
  const codeGame = useSelector(state => state.createGame.code);

  useEffect(() => {
    if (contentType === "CreateGame") {
      dispatch(createGameCode());
    }
  }, [contentType]);

  const getGameId = async (val) => {
    if (val === "CodeEnter") {
      if (code) {
        await dispatch(joinGameWithCode(code));
      }
    } else {
      setSearchType(val)
    }
  }

  const cancelGame = async () => {
    client.send(JSON.stringify([7, "go/game", {command: "resign", token: token, game_id: gameId}]));
    await dispatch(clearGameId())
    setSearchType("")
  }

  return (
    <>
      {!contentType ? (
        <CustomCodeContent
          setSearchType={setSearchType}
          setContentType={setContentType}
        />
      ) : null}
      {contentType === "CreateGame" ? (
        <CreateGame cancelGame={()=>cancelGame()} setSearchType={setSearchType} code={codeGame} />
      ) : null}
      {contentType === "JoinGame" ? (
        <JoinGame cancelGame={()=>cancelGame()} setSearchType={(val) => getGameId(val)} code={code} setCode={(val) => setCode(val)} />
      ) : null}
    </>
  );
};

import React, { useEffect } from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

import { client, token } from '../../../../Socket.js'
import { clearGameId } from "../../../../store/GameCreate/actions";
import { Input } from "../../../../components/InputCustom";

const Text = styled.p`
  font-size: 36px;
  line-height: 42px;
  margin-bottom: 86px;
  text-align: center;
`;

const Spinner = styled.div`
  margin: 0 auto;
  width: 126px;
  margin-bottom: 46px;
`;

export const LoadingGame = ({ text, setSearchType, setOpponent, searchType, gameId }) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.profile.userProfile.user.id);
  const codeGame = useSelector(state => state.createGame.code);

  useEffect(() => {
    if (gameId) {
      client.send(JSON.stringify([5, 'go/game']));
      client.send(JSON.stringify([7, "go/game", {command: "auth", token: localStorage.getItem('GoGameToken'), game_id: gameId}]));

      client.onmessage = function(e) {
        if (typeof e.data === 'string') {
          let jsonData = JSON.parse(e.data);
          if (jsonData.payload) {
            if (jsonData.payload.type === 'userConnected') {
              if (String(jsonData.payload.userId) !== String(user_id)) {
                setOpponent(jsonData.payload.player)
                if (searchType === "Random") {
                  setSearchType("ConnectRandom");
                }
                if (searchType === "CodeEnter") {
                  setSearchType("ConnectCode");
                }
              }
            }
          }
        }
      }
    }
  }, [gameId]);

  const cancelGame = async () => {
    client.send(JSON.stringify([7, "go/game", {command: "resign", token: token, game_id: gameId}]));
    await dispatch(clearGameId())
    setSearchType("")
  }
  const codeBlock = () => {
    if (codeGame) {
      return <Input value={codeGame || 'Ожидайте'} textAlign="center" disabled mt={40} mb={30} />
    }
  }

  return (
    <>
      <Spinner>
        <Loader type="Grid" color="#3b3b3b" height={126} width={126} />
      </Spinner>
      <Text>{text}</Text>
      {codeBlock()}
      <ButtonCustom onClick={() => cancelGame()}>
        Отмена
      </ButtonCustom>
    </>
  );
};

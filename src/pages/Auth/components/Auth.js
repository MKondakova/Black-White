import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { store } from "../../../App";
import { ButtonCustom } from "../../../components/ButtonCustom";
import { Input } from "../../../components/InputCustom";
import { strings } from "../../../language";
import { regSubmit, loginSubmit } from "../../../store/Auth/actions";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  padding: 230px 0;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 40%;
  min-width: 300px;
  margin: 0 auto;
`;

const Form = styled.form``;


const Tabs = styled.div`
  display: flex;
`;

const Tab = styled.p`
  cursor: pointer;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => (props.active ? "#000000" : "#838383")};
  font-weight: 700;
`;
const Span = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #838383;
  font-weight: 700;
  margin-left: 5px;
  margin-right: 5px;
`;

const Auth = () => {
  const [activeTab, setActiveTab] = useState("reg");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (activeTab === "reg") {
      if (!email || !nickname) {
        setError(strings.enterAll);
      } else {
        setError("");
        await dispatch(regSubmit(nickname, email));

        let unsub = store.subscribe(() => {
          let state = store.getState();
          if (state.auth.error) {
            setError(state.auth.error);
            unsub();
          }
        })
      }
    }
    if (activeTab === "auth") {
      if (!email || !password) {
        setError(strings.enterAll);
      } else {
        setError("");
        await dispatch(loginSubmit(password, email));
        let unsub = store.subscribe(() => {
          let state = store.getState();
          if (state.auth.error) {
            setError(state.auth.error);
            unsub();
          }
        })
      }
    }
  };

  return (
    <Wrapper>
      <Container>
      <ButtonCustom 
            width="70px"
            textAlign="center"
            mb="20"
            borderRadius="100%"
            onClick={() => {
              if (localStorage.getItem("language") === 'ru')
              localStorage.setItem("language", 'en')
              else localStorage.setItem("language", 'ru')
              window.location.reload();
            }}>
              {strings.lang}
        </ButtonCustom>
        <Form onSubmit={handleAuth}>
          <Tabs>
            <Tab
              onClick={() => setActiveTab("reg")}
              active={activeTab === "reg"}
            >
              {strings.register}
            </Tab>
            <Span>\</Span>
            <Tab
              onClick={() => setActiveTab("auth")}
              active={activeTab === "auth"}
            >
              {strings.auth}
            </Tab>
          </Tabs>
          <Input
            mt={20}
            type="email"
            placeholder="Email"
            onChange={setEmail}
            value={email}
            name="email"
          />
          {activeTab === "reg" ? (
            <Input
              mt={10}
              mb={30}
              placeholder="Nickname"
              onChange={setNickname}
              value={nickname}
              errorMessage={error}
              noError={!error}
              name="nickname"
            />
          ) : (
            <Input
              mt={10}
              mb={30}
              placeholder="Password"
              onChange={setPassword}
              value={password}
              errorMessage={error}
              noError={!error}
              name="password"
              type="password"
            />
          )}
          <ButtonCustom type="submit">{strings.submit}</ButtonCustom>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default Auth;

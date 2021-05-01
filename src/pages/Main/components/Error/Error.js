import React from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../../../components/ButtonCustom";
import ErrorImage from "../../../../assets/img/error.png";

const ErrorText = styled.p`
  font-size: 28px;
  line-height: 33px;
  text-align: center;
`;

const Content = styled.div`
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorImg = styled.img`
`;

export const Error = ({ setSearchType, error }) => {
  return (
    <>
      <Content>
        <Info>
          <ErrorImg alt="error" src={ErrorImage} />
          <ErrorText>{error}</ErrorText>
        </Info>
      </Content>
      <ButtonCustom
        width="327px"
        mb={30}
        onClick={() => {
          setSearchType("");
        }}
      >
        В меню
      </ButtonCustom>
      <ButtonCustom width="327px">Попробовать еще раз</ButtonCustom>
    </>
  );
};

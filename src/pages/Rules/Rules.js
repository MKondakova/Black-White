import React from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../components/ButtonCustom";
import { MAIN_URL, RULES } from "../../constants/routes";
import Image1 from '../../assets/img/Image1.gif'

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  align-items: left;
  max-width: 1210px;
  margin: 0 auto;
  padding: 100px 0;
`;
const Title = styled.p`
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
`;

const Content = styled.div`
  margin-top: 26px;
  margin-bottom: 42px;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
`;
const Text = styled.p`
  font-size: 24px;
  line-height: 32px;
`;

const Rules = ({history}) => {
  return (
    <Wrapper>
      <Title>Информация для участников</Title>
      <Content>
        <Text>
        <table>
        <tr>
        <td>
            <img src={Image1} width="167" height="163" align="top"></img>
        </td>
        <td>
            <p>Перед вами доска 9х9. У нее девять линий по вертикали и 9 по горизонтали. Даже если вы совсем незнакомы с Го, очень скоро вы сможете наслаждаться игрой.</p>
            <strong>Го - игра на захват территорий.</strong>
            <p></p>
            <strong>5 основных правил игры.</strong>
            <ol>
                <li> Игра начинается с пустой доски. Затем два партнера по очереди ставят на нее камни своего цвета. У одного они белые, у другого - черные.</li>
                <li>Побеждает тот, кто окружит больше территории.</li>
                <li>Камень или группа камней противника, которые вы окружили своими камнями, снимается с доски.</li>
                <li>Во время игры на доске появляются пункты куда нельзя ходить: запрещенные пункты.</li>
                <li>Запрещается повторять позицию: правило ко</li>
            </ol>
        </td>
        </tr>

        </table>
        </Text>
      </Content>
      <ButtonCustom
        width="327px"
        onClick={() => {
          history.push(MAIN_URL);
        }}
      >
        Назад
      </ButtonCustom>
    </Wrapper>
);
};

export default Rules;

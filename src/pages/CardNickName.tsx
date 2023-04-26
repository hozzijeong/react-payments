import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "src/components/@common/card";
import useCardList from "src/hooks/useCardList";
import { PATHS } from "src/utils/constant";
import styled from "styled-components";

function CardNickName() {
  const navigation = useNavigate();
  const location = useLocation();
  const { saveCard } = useCardList({ key: "card-list" });

  const [nickName, setNickName] = useState("");

  useEffect(() => {
    if (!location.state) {
      alert("잘못된 접근입니다. 보유 카드로 이동합니다.");
      navigation(PATHS.cardList);
    }
  });

  const registerCard: React.MouseEventHandler<HTMLButtonElement> = () => {
    saveCard({ ...location.state, nickName });
    navigation(PATHS.cardList);
  };

  return (
    <>
      {location.state && (
        <Styled.NickNameContainer>
          <Styled.Title>카드 등록이 완료되었습니다.</Styled.Title>
          <Card
            cardName={location.state.cardName}
            cardNumber={location.state.cardNumbers}
            ownerName={location.state.ownerName}
            expireDate={location.state.expireDate}
          />
          <Styled.NickNameInput
            type="text"
            onChange={(event) => setNickName(event.target.value)}
          />
          <Styled.ButtonContainer>
            <Styled.NextButton onClick={registerCard}>확인</Styled.NextButton>
          </Styled.ButtonContainer>
        </Styled.NickNameContainer>
      )}
    </>
  );
}

export default CardNickName;

const Styled = {
  NickNameContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 130px auto 0 auto;
    width: 375px;
  `,

  Title: styled.span`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;

    color: var(--label-color);
  `,

  NickNameInput: styled.input`
    width: 240px;

    margin: 100px 0 0 0;
    border: none;
    border-bottom: solid #737373 1.5px;

    text-align: center;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;

    color: #383838;

    &:focus {
      outline: none;
    }
  `,

  ButtonContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    margin: 119px 0 20px 0;
  `,

  NextButton: styled.button`
    width: 51px;

    background: none;
    border: none;

    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;

    &:hover {
      cursor: pointer;
    }
  `,
};
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCardList from "./useCardList";
import { PATHS } from "src/utils/constant";
import { CardInfoContext } from "src/context/CardInfoContext";

function useSaveNickName() {
  const navigation = useNavigate();
  const [cardInfo] = useContext(CardInfoContext);
  const { cardName, cardNumbers, ownerName, expireDate } = cardInfo;
  const { saveCard } = useCardList({ key: "card-list" });

  const [nickName, setNickName] = useState("");

  useEffect(() => {
    if (!cardInfo.securityCode.length) {
      alert("잘못된 접근입니다. 보유 카드로 이동합니다.");
      navigation(PATHS.cardList);
    }
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNickName(event.target.value);
  };

  const registerCard: React.MouseEventHandler<HTMLButtonElement> = () => {
    saveCard({ ...cardInfo, nickName });
    navigation(PATHS.registerFinished);
  };

  return {
    cardName,
    cardNumbers,
    ownerName,
    expireDate,
    nickName,
    onChange,
    registerCard,
  };
}

export default useSaveNickName;

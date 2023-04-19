import React, { useState } from "react";
import FormLabel from "./common/FormLabel";
import Input from "./common/Input";
import ErrorSpan from "./common/ErrorSpan";

function OwnerNameInput() {
  const [ownerName, setOwnerName] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const ownerNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const value = event.currentTarget.value as string;

    try {
      if (!/^[a-zA-Z][a-zA-Z ]*$/.test(value)) {
        throw new Error("카드 소유자 이름은 영어와 공백만 입력 가능합니다.");
      }

      if (/[ ]{2,}/.test(value)) {
        throw new Error(
          "카드 소유자 이름은 공백을 연속해서 작성할 수 없습니다.",
        );
      }

      if (value.length < 3 || value.length > 30) {
        throw new Error("카드 소유자 이름은 3글자 이상 30글자 이하입니다.");
      }

      setError({
        isError: false,
        message: "",
      });
    } catch (error) {
      if (!(error instanceof Error)) return;

      setError({
        isError: true,
        message: error.message,
      });
    } finally {
      if (value.length <= 30) {
        setOwnerName(value.toUpperCase());
      }
    }
  };

  return (
    <div>
      <div>
        <FormLabel>카드 소유자 이름(선택)</FormLabel>
        <span>{`${ownerName.length} / 30`}</span>
      </div>
      <Input value={ownerName} onChange={ownerNameChange} />
      {error.isError && <ErrorSpan>{error.message}</ErrorSpan>}
    </div>
  );
}

export default OwnerNameInput;

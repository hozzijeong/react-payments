import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useReducer,
} from "react";
import { CardIDProps, CardInfoProps } from "src/interfaces";
import { initialCardInfos } from "src/utils/constant";
import { EACH_SECOND_CHANCE } from "src/utils/regexp";

type ReducerActionType = keyof CardInfoProps | "clear";

function reducer(
  state: CardInfoProps,
  action: {
    type: ReducerActionType;
    payload: string;
    index?: number;
  },
): CardInfoProps {
  const { type, payload, index } = action;
  switch (type) {
    case "cardNumbers":
    case "password":
      if (index !== undefined && !isNaN(index)) {
        state[type][index] = payload;
      }
      return { ...state, [type]: state[type] };

    case "ownerName":
      return { ...state, [type]: payload.toUpperCase() };

    case "expireDate":
      const date = payload.replace("/", "");
      const expire = date.match(EACH_SECOND_CHANCE) ?? [];
      return { ...state, [type]: expire.join("/") };

    case "cardName":
      return { ...state, [type]: payload as CardIDProps };

    case "clear":
      return initialCardInfos;

    default:
      return { ...state, [type]: payload };
  }
}

export const CardInfoContext = createContext<
  [
    CardInfoProps,
    React.Dispatch<{
      type: ReducerActionType;
      payload: string;
      index?: number;
    }> | null,
  ]
>([initialCardInfos, null]);

export function CardInfoProvider({ children }: PropsWithChildren) {
  const [inputValueContext] = useContext(CardInfoContext);

  const [state, dispatch] = useReducer(reducer, inputValueContext);

  return (
    <CardInfoContext.Provider value={[state, dispatch]}>
      {children}
    </CardInfoContext.Provider>
  );
}

import React, { forwardRef, ComponentPropsWithoutRef } from "react";
import styled, { CSSProp } from "styled-components";

interface Props extends StyleInputProps, ComponentPropsWithoutRef<"input"> {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  placeholder?: string;
  type?: string;
  inputmode?: React.HTMLAttributes<HTMLLIElement>["inputMode"];
}

interface StyleInputProps {
  customInputStyle?: CSSProp;
}

const Input = forwardRef<HTMLInputElement, Props>(function (
  { value, placeholder, onChange, inputmode, type, ...props }: Props,
  ref,
) {
  return (
    <InputStyle
      value={value}
      onChange={onChange}
      inputMode={inputmode ?? "text"}
      placeholder={placeholder}
      ref={ref}
      type={type ?? "text"}
      {...props}
    />
  );
});

export default Input;

const InputStyle = styled.input<StyleInputProps>`
  width: 100%;
  height: 45px;

  background-color: var(--input-background);
  border-radius: 7px;
  border: none;

  padding: 0 10px;

  &:focus {
    outline: none;
  }
  ${({ customInputStyle }) => customInputStyle && customInputStyle};
`;

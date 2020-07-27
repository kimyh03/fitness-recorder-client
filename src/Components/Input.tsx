import React from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  height: 40px;
  font-size: 12px;
  text-align: center;
  background-color: ${(props) => props.theme.whiteBgColor};
  margin-bottom: 10px;
`;

interface Iprops {
  type: string;
  value: string;
  placeholder: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.SFC<Iprops> = ({
  type,
  value,
  placeholder,
  required,
  onChange
}) => (
  <Container
    type={type}
    value={value}
    placeholder={placeholder}
    required={required}
    onChange={onChange}
  />
);

export default Input;

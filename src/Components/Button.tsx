import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: 80%;
  border: 0;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  background: -webkit-linear-gradient(
    124deg,
    rgb(116, 177, 243),
    rgb(0, 113, 255)
  );
  background: linear-gradient(124deg, rgb(116, 177, 243), rgb(0, 113, 255));
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  margin: 20px;
`;

interface IProps {
  text: string;
}

const Button: React.FunctionComponent<IProps> = (props) => (
  <Container>{props.text}</Container>
);

export default Button;

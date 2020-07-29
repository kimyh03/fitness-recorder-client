import React from "react";
import styled from "styled-components";
import { Create } from "./Icons";

const Container = styled.div`
  width: 100%;
  padding: 30px 50px;
  background: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: ${(props) => props.theme.border};
  border-left: ${(props) => `.25rem solid ${props.color}!important`};
  border-radius: 15px;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
    transform: translateY(-5px);
    transform: scale(1.03);
  }
  transition: transform 0.2s ease-in-out 0s;
`;

const Title = styled.div`
  color: ${(props) => props.color};
  font-size: 25px;
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  margin-left: 30px;
`;

const SubTitle = styled.div`
  color: #5a5c69;
  opacity: 0.8;
  font-size: 14px;
`;

interface IProps {
  type: string;
}

const CreateButton: React.SFC<IProps> = ({ type }) => {
  let color = "";
  let subTitle = "";
  switch (type) {
    case "Exercise":
      color = "#4E73DF";
      subTitle = "Add a new exercise to your list!";
      break;
    case "Workout":
      color = "#1CC88A";
      subTitle = "Did you workout today? Record It!";
      break;
    case "Inbody":
      color = "#E74A3B";
      subTitle = "Don't forget to record your Inbody data!";
  }

  return (
    <Container color={color}>
      <Create color={color} />
      <Wrapper>
        <Title color={color}>{type}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Wrapper>
    </Container>
  );
};

export default CreateButton;

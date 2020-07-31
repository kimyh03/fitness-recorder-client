import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import styled, { keyframes } from "styled-components";

const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const RiseEffect = keyframes`
0%{
    opacity:0;
    transform:translateY(7px);
}
100%{
  opacity:1;
  transform:translateY(0px);
}
`;

const Container = styled.div`
  width: 100%;
  background: white;
  height: 70px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #e3e6f0;

  animation: ${RiseEffect} 0.5s ease-in-out 0s;
`;

const Greeting = styled.div`
  color: ${(props) => props.theme.blueBgColor};
  font-size: 25px;
  font-weight: 700;
`;

const LogOut = styled.button`
  background: ${(props) => props.theme.blueBgColor};
  border-radius: 3px;
  padding: 7px 10px;
  color: white;
  font-size: 12px;
  opacity: 0.9;
  cursor: pointer;
  right: flex-start;
  position: absolute;
  right: 30px;
  :hover {
    opacity: 1;
  }
`;

interface IProps {
  username: string;
}

const Header: React.SFC<IProps> = ({ username }) => {
  const [logUserOut] = useMutation(LOG_USER_OUT);
  const onClick = async () => {
    await logUserOut();
    window.location.href = "http://localhost:3000/";
  };
  return (
    <Container>
      <Greeting>{`반갑습니다! ${username} 님`}</Greeting>
      <LogOut onClick={onClick}>log out</LogOut>
    </Container>
  );
};
export default Header;

import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 300px;
  opacity: 0.7;
`;

const Text = styled.div`
  margin-top: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.lightBlueCollor};
`;

export default () => (
  <Container>
    <Loader
      type="TailSpin"
      color="#2550D1"
      height={30}
      width={30}
      timeout={30000}
    />
    <Text>Loading...</Text>
  </Container>
);

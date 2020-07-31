import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 70px;
  text-align: center;
  background: white;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${(props) => props.theme.border};
`;

const Copyright = styled.div`
  opacity: 0.5;
`;

export default () => (
  <Container>
    <Copyright>
      Fitness recorder &copy; {new Date().getFullYear()} Hoony
    </Copyright>
  </Container>
);

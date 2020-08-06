import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 40%;
  text-align: center;
  background: white;
  border-radius: 10px;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.boxShadow};
  :hover {
    transform: translateY(-5px);
    transform: scale(1.03);
  }
  transition: transform 0.2s ease-in-out 0s;
`;

const Header = styled.div`
  width: 100%;
  background: #f7f8fb;
  border-bottom: 1px solid #e3e6f0;
  color: #4e73df;
  font-weight: 700;
  font-size: 17px;
  padding: 13px 25px;
`;

const NoData = styled.div`
  padding: 25px;
  width: 100%;
  text-align: center;
  opacity: 0.6;
`;

export default () => (
  <>
    <Container>
      <Header>Recent workout data</Header>
      <NoData>아직 데이터가 없습니다.</NoData>
    </Container>
  </>
);

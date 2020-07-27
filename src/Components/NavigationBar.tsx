import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Body, Chart, Gym, Home, RightArrow } from "./Icons";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  max-width: 250px;
  padding: 0 15px;
  width: 100%;
  display: flex;
  flex-direction: column;

  background: -webkit-linear-gradient(
    124deg,
    rgb(116, 177, 243),
    rgb(0, 113, 255)
  );
  background: linear-gradient(124deg, rgb(116, 177, 243), rgb(0, 113, 255));
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 20px 0;
  border-bottom: 0.5px solid white;
`;

const Item = styled.div`
  margin-left: 10px;
`;
const STitle = styled.div`
  margin-bottom: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.whiteBgColor};
  opacity: 0.8;
`;
const SItem = styled.div`
  margin-left: 28px;
  margin-top: 15px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SLnk = styled(Link)`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.whiteBgColor};
  opacity: 0.8;
  :hover {
    color: white;
    opacity: 1;
    font-weight: 700;
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.whiteBgColor};
  font-size: 30px;
  padding: 30px 0;
  border-bottom: 1px solid white;
  text-align: center;
`;

const NavigationBar = () => (
  <Container>
    <Title>Fitness Recorder</Title>
    <List>
      <Wrapper>
        <SLnk to={"/"}>
          <ItemWrapper>
            <Home />
            <Item>Home</Item>
          </ItemWrapper>
          <RightArrow />
        </SLnk>
      </Wrapper>
      <Wrapper>
        <STitle>
          <ItemWrapper>
            <Body />
            <Item>Body part</Item>
          </ItemWrapper>
        </STitle>
        <SLnk to={"/exercises"}>
          <SItem>All</SItem>
          <RightArrow />
        </SLnk>
        <SLnk to={"/exercises"}>
          <SItem>Chest</SItem>
          <RightArrow />
        </SLnk>
        <SLnk to={"/exercises"}>
          <SItem>Back</SItem>
          <RightArrow />
        </SLnk>
        <SLnk to={"/exercises"}>
          <SItem>Leg</SItem>
          <RightArrow />
        </SLnk>
        <SLnk to={"/exercises"}>
          <SItem>Shoulder</SItem>
          <RightArrow />
        </SLnk>
        <SLnk to={"/exercises"}>
          <SItem>Arms</SItem>
          <RightArrow />
        </SLnk>
      </Wrapper>
      <Wrapper>
        <SLnk to={"/workouts"}>
          <ItemWrapper>
            <Gym />
            <Item>Workouts</Item>
          </ItemWrapper>
          <RightArrow />
        </SLnk>
      </Wrapper>
      <Wrapper>
        <SLnk to={"/inbodies"}>
          <ItemWrapper>
            <Chart />
            <Item>Inbodies</Item>
          </ItemWrapper>
          <RightArrow />
        </SLnk>
      </Wrapper>
    </List>
  </Container>
);

export default NavigationBar;

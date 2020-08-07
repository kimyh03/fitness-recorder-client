import React from "react";
import { LeftButton, RightButton } from "src/Components/Icons";
import styled, { keyframes } from "styled-components";

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
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  opacity: 0;
  width: 100%;
  margin-top: 20px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${RiseEffect} 1s forwards 0.5s;
`;

const Date = styled.div`
  color: ${(props) => props.theme.blueBgColor};
  font-size: 30px;
  font-weight: 700;
  margin: 0 20px;
`;

const Button = styled.div`
  padding-top: 5px;
  opacity: 0.7;
  :hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const WorkoutContainer = styled.div`
  width: 60%;
  opacity: 0;
  animation: ${RiseEffect} 1s forwards 1s;
`;

const Workout = styled.div`
  width: 100%;
  margin-top: 25px;
  height: 130px;
  background: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 10px 15px 0px rgba(230, 230, 230, 1);
  -moz-box-shadow: 0px 10px 15px 0px rgba(230, 230, 230, 1);
  box-shadow: 0px 10px 15px 0px rgba(230, 230, 230, 1);
  :hover {
    transform: translateY(-5px);
    transform: scale(1.03);
  }
  transition: transform 0.2s ease-in-out 0s;
`;

interface IProps {
  year: any;
  month: any;
  toNextMonth: any;
  toLastMonth: any;
  workout: any;
}

const WorkoutPresenter: React.SFC<IProps> = ({
  year,
  month,
  toNextMonth,
  toLastMonth,
  workout
}) => {
  console.log(workout);
  return (
    <Container>
      <Header>
        <Button onClick={toLastMonth}>
          <LeftButton size={"25"} />
        </Button>
        <Date>{`${year}년 ${month + 1}월`}</Date>
        <Button onClick={toNextMonth}>
          <RightButton size={"25"} />
        </Button>
      </Header>
      <WorkoutContainer>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
        <Workout></Workout>
      </WorkoutContainer>
    </Container>
  );
};

export default WorkoutPresenter;

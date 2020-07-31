import React from "react";
import CreateButton from "src/Components/CreateButton";
import ExerciseCard from "src/Components/ExerciseCard";
import Header from "src/Components/Header";
import InbodyChart from "src/Components/InbodyChart";
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

const Title = styled.div`
  margin: 0 0 20px 0;
  color: #5a5c69;
  font-size: 25px;
`;

const Container = styled.div`
  width: 95%;
  margin: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: ${RiseEffect} 1s forwards 0.5s;
`;

const Section = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 30%;
`;

interface IProps {
  username: string;
  exercises: any;
  setAction: any;
  inbody: any;
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  username,
  exercises,
  setAction,
  inbody
}) => {
  return (
    <>
      <Header username={username} />
      <Container>
        <Section>
          <Title>Record your body!</Title>
          <Wrapper>
            <ButtonContainer onClick={() => setAction("Exercise")}>
              <CreateButton type={"Exercise"} />
            </ButtonContainer>
            <ButtonContainer onClick={() => setAction("Workout")}>
              <CreateButton type={"Workout"} />
            </ButtonContainer>
            <ButtonContainer onClick={() => setAction("Inbody")}>
              <CreateButton type={"Inbody"} />
            </ButtonContainer>
          </Wrapper>
        </Section>
        <Section>
          <Title>InbodyChart</Title>
          <InbodyChart
            bodyWeight={inbody.weight}
            muscle={inbody.muscle}
            fat={inbody.fat}
            bodyFatRate={inbody.bodyFatRate}
          />
        </Section>
        <Section>
          <Title>Exercises</Title>
          <Wrapper>
            <ExerciseCard bodyPart={"Chest"} exercises={exercises.chest} />
            <ExerciseCard bodyPart={"Back"} exercises={exercises.back} />
            <ExerciseCard
              bodyPart={"Shoulder"}
              exercises={exercises.shoulder}
            />
            <ExerciseCard bodyPart={"Leg"} exercises={exercises.leg} />
            <ExerciseCard bodyPart={"Arm"} exercises={exercises.arm} />
          </Wrapper>
        </Section>
      </Container>
    </>
  );
};

export default HomePresenter;

import React from "react";
import CreateButton from "src/Components/CreateButton";
import ExerciseCard from "src/Components/ExerciseCard";
import Header from "src/Components/Header";
import styled from "styled-components";

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
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  username,
  exercises,
  setAction
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

import React from "react";
import CreateButton from "src/Components/CreateButton";
import ExerciseCard from "src/Components/ExerciseCard";
import Header from "src/Components/Header";
import InbodyChart from "src/Components/InbodyChart";
import NoInbodyChart from "src/Components/NoInbodyChart";
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
  deleteExercise: any;
  types: string[];
  bodyParts: string[];
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  username,
  exercises,
  setAction,
  inbody,
  deleteExercise,
  types,
  bodyParts
}) => {
  return (
    <>
      <Header username={username} />
      <Container>
        <Section>
          <Title>Record your body!</Title>
          <Wrapper>
            {types.map((type) => (
              <ButtonContainer key={type} onClick={() => setAction(type)}>
                <CreateButton type={type} />
              </ButtonContainer>
            ))}
          </Wrapper>
        </Section>
        <Section>
          <Title>InbodyChart</Title>
          {inbody ? (
            <InbodyChart
              bodyWeight={inbody.weight}
              muscle={inbody.muscle}
              fat={inbody.fat}
              bodyFatRate={inbody.bodyFatRate}
              recordDate={inbody.recordDate}
            />
          ) : (
            <NoInbodyChart />
          )}
        </Section>
        <Section>
          <Title>Exercises</Title>
          <Wrapper>
            {bodyParts.map((bodyPart, index) => (
              <ExerciseCard
                key={bodyPart}
                deleteExercise={deleteExercise}
                bodyPart={bodyPart}
                exercises={exercises[index]}
              />
            ))}
          </Wrapper>
        </Section>
      </Container>
    </>
  );
};

export default HomePresenter;

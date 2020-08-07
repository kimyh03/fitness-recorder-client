import React from "react";
import CreateButton from "src/Components/CreateButton";
import ExerciseCard from "src/Components/ExerciseCard";
import Header from "src/Components/Header";
import { LeftButton, RightButton } from "src/Components/Icons";
import InbodyChart from "src/Components/InbodyChart";
import NoInbodyChart from "src/Components/NoInbodyChart";
import NoWorkout from "src/Components/NoWorkout";
import WorkoutChart from "src/Components/WorkoutChart";
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
  display: flex;
  align-items: center;
`;

const PageButton = styled.button`
  padding-top: 7px;
  background: none;
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

const InbodyContainer = styled.div`
  width: 38%;
`;

const WorkoutContainer = styled.div`
  width: 60%;
`;

interface IProps {
  username: string;
  exercises: any;
  setAction: any;
  inbody: any;
  deleteExercise: any;
  workouts: any;
  records: any;
  types: string[];
  bodyParts: string[];
  toNextMonth: any;
  toLastMonth: any;
  year: number;
  month: number;
  setExerciseID: any;
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  username,
  exercises,
  setAction,
  inbody,
  deleteExercise,
  types,
  bodyParts,
  workouts,
  records,
  toNextMonth,
  toLastMonth,
  year,
  month,
  setExerciseID
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
          <Wrapper>
            <InbodyContainer>
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
            </InbodyContainer>
            <WorkoutContainer>
              <Title>
                <PageButton onClick={toLastMonth}>
                  <LeftButton />
                </PageButton>
                {`${year}년 ${month + 1}월의 기록`}
                {year >= new Date().getFullYear() &&
                month >= new Date().getMonth() ? (
                  <></>
                ) : (
                  <PageButton onClick={toNextMonth}>
                    <RightButton />
                  </PageButton>
                )}
              </Title>
              {workouts.length > 0 ? (
                <WorkoutChart
                  bodyParts={bodyParts}
                  workouts={workouts}
                  records={records}
                />
              ) : (
                <NoWorkout />
              )}
            </WorkoutContainer>
          </Wrapper>
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
                setAction={setAction}
                setExerciseID={setExerciseID}
              />
            ))}
          </Wrapper>
        </Section>
      </Container>
    </>
  );
};

export default HomePresenter;

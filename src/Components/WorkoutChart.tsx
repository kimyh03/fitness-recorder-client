import React from "react";
import styled from "styled-components";
import { Calendar, StarFull } from "./Icons";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div<{ width }>`
  width: ${(props) => props.width};
`;

const SColumn = styled.div<{ width }>`
  width: ${(props) => props.width};
`;

const Row = styled.div<{ height }>`
  height: ${(props) => props.height};
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 100%;
  background: #f7f8fb;
  border-bottom: 1px solid #e3e6f0;
  color: #4e73df;
  font-weight: 700;
  font-size: 17px;
  padding: 13px 25px;
  z-index: 10;
`;

const ReviewContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.boxShadow};
  :hover {
    transform: scale(1.03);
  }
  transition: transform 0.2s ease-in-out 0s;
  height: 370px;
`;

const RatingContainer = styled.div`
  width: 100%;
  height: 100%;
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

const DaysContainer = styled.div`
  width: 100%;
  height: 100%;
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

const SetsContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 10px;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const SmallContainer = styled.div`
  height: 78%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const IconContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataContainer = styled.div`
  width: 50%;
  text-align: center;
  font-size: 65px;
  font-weight: 700;
  opacity: 0.8;
  color: #0162f2;
`;

const ReviewWrapper = styled.div`
  overflow: auto;
  padding: 0 15px;
`;

const Review = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: center;
  border-bottom: ${(props) => props.theme.border};
  color: #4e73df;
  opacity: 0.7;
  font-size: 15px;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  :hover {
    opacity: 1;
  }
`;

const SetsTable = styled.div`
  display: flex;
  height: 70%;
  justify-content: space-around;
  align-items: center;
`;

const SetWrapper = styled.div`
  width: 20%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  font-size: 17px;
  color: #0162f2;
  border-right: ${(props) => props.theme.border};
  :hover {
    transform: scale(1.1);
  }
  transition: transform 0.15s ease-in-out 0s;
`;
const BodyPartColumn = styled.div`
  margin-bottom: 15px;
  font-weight: 700;
`;
const SetsData = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

interface Iprops {
  workouts: any;
  records: any;
  bodyParts: string[];
}

const WorkoutChart: React.SFC<Iprops> = ({ workouts, records, bodyParts }) => {
  // tslint:disable-next-line: prefer-const
  let setContainer = [0, 0, 0, 0, 0];
  // tslint:disable-next-line: prefer-const
  for (let i = 0; i < 5; i++) {
    // tslint:disable-next-line: prefer-const
    let index = i;
    records[index].map((item) => {
      setContainer[index] = setContainer[index] + item.set;
      return null;
    });
  }
  let ratingContainer = 0;
  workouts.map((item) => {
    ratingContainer = ratingContainer + item.rating;
    return null;
  });
  const daysOfWorkout = workouts.length;
  const averageOfRating = (ratingContainer / daysOfWorkout).toFixed(2);
  return (
    <Container>
      <Column width={"64%"}>
        <Row height={"54%"}>
          <SColumn width={"49%"}>
            <DaysContainer>
              <Header>Days of workouts</Header>
              <SmallContainer>
                <IconContainer>
                  <Calendar />
                </IconContainer>
                <DataContainer>{daysOfWorkout}</DataContainer>
              </SmallContainer>
            </DaysContainer>
          </SColumn>
          <SColumn width={"49%"}>
            <RatingContainer>
              <Header>Average of ratings</Header>
              <SmallContainer>
                <IconContainer>
                  <StarFull size={"100"} />
                </IconContainer>
                <DataContainer>{averageOfRating}</DataContainer>
              </SmallContainer>
            </RatingContainer>
          </SColumn>
        </Row>
        <Row height={"43%"}>
          <SetsContainer>
            <Header>Sets</Header>
            <SetsTable>
              {bodyParts.map((item, index) => (
                <SetWrapper key={index}>
                  <BodyPartColumn>{item}</BodyPartColumn>
                  <SetsData>{setContainer[index]}</SetsData>
                </SetWrapper>
              ))}
            </SetsTable>
          </SetsContainer>
        </Row>
      </Column>
      <Column width={"34%"}>
        <ReviewContainer>
          <Header>Reivews</Header>
          <ReviewWrapper>
            {workouts.map((item, index) => (
              <Review key={index}>" {item.review} "</Review>
            ))}
          </ReviewWrapper>
        </ReviewContainer>
      </Column>
    </Container>
  );
};

export default WorkoutChart;

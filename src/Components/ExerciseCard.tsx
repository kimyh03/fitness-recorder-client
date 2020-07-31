import React from "react";
import styled from "styled-components";

interface Exercise {
  title: string;
  latestRecord: string;
}

interface IProps {
  bodyPart: string;
  exercises: Exercise[];
}

const Container = styled.div`
  height: 400px;
  width: 18%;
  background: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: ${(props) => props.theme.border};
  border-radius: 10px;
`;

const Header = styled.div`
  background: #f7f8fb;
  border-bottom: 1px solid #e3e6f0;
  color: #4e73df;
  font-weight: 700;
  font-size: 17px;
  padding: 13px 25px;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 353px;
`;

const Coulmn = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: center;
  border-bottom: ${(props) => props.theme.border};
  color: #4e73df;
  opacity: 0.7;
  font-size: 15px;
  font-weight: 700;
  :hover {
    opacity: 1;
  }
`;

const TitleCoulmn = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

const RecordCoulmn = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`;

const NoData = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
  color: #4e73df;
  opacity: 0.7;
  font-weight: 700;
`;

const ExerciseCard: React.SFC<IProps> = ({ bodyPart, exercises }) => {
  if (exercises.length === 0) {
    return (
      <Container>
        <Header>{bodyPart}</Header>
        <NoData>등록한 운동이 없습니다.</NoData>
      </Container>
    );
  } else {
    return (
      <Container>
        <Header>{bodyPart}</Header>
        <Data>
          {exercises.map((item) => (
            <Coulmn>
              <TitleCoulmn>{item.title}</TitleCoulmn>
              <RecordCoulmn>
                {item.latestRecord ? `${item.latestRecord} kg` : "0 kg"}
              </RecordCoulmn>
            </Coulmn>
          ))}
        </Data>
      </Container>
    );
  }
};
export default ExerciseCard;

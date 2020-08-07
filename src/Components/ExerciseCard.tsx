import React from "react";
import styled from "styled-components";
import { Pencil, TrashCan } from "./Icons";

interface Exercise {
  id: string;
  title: string;
  latestRecord: string;
}

const Container = styled.div`
  height: 400px;
  width: 18%;
  background: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: ${(props) => props.theme.border};
  border-radius: 10px;
  :hover {
    transform: translateY(-5px);
    transform: scale(1.03);
  }
  transition: transform 0.2s ease-in-out 0s;
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
  padding: 20px 10px;
  justify-content: center;
  border-bottom: ${(props) => props.theme.border};
  color: #4e73df;

  font-size: 15px;
  font-weight: 700;
`;

const TitleCoulmn = styled.div`
  width: 70%;
  display: flex;
  opacity: 0.7;
  justify-content: center;
`;

const RecordCoulmn = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  opacity: 0.8;
`;

const NoData = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
  opacity: 0.6;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const DeleteButton = styled.button`
  opacity: 0.4;
  font-weight: 700;
  color: red;
  background: none;
  :hover {
    opacity: 1;
  }
`;

const EditButton = styled.button`
  opacity: 0.4;
  font-weight: 700;
  color: red;
  background: none;
  :hover {
    opacity: 1;
  }
`;

interface IProps {
  bodyPart: string;
  exercises: Exercise[];
  deleteExercise: any;
  setAction: any;
  setExerciseID: any;
}

const ExerciseCard: React.SFC<IProps> = ({
  bodyPart,
  exercises,
  deleteExercise,
  setAction,
  setExerciseID
}) => {
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
            <Coulmn key={item.id}>
              <ButtonContainer>
                <DeleteButton value={item.id} onClick={deleteExercise}>
                  <TrashCan />
                </DeleteButton>
                <EditButton
                  onClick={async () => {
                    await setExerciseID(item.id);
                    setAction("editExercise");
                  }}
                >
                  <Pencil />
                </EditButton>
              </ButtonContainer>
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

import React from "react";
import styled from "styled-components";
import { StarEmpty, StarFull } from "./Icons";

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  top: 20%;
  width: 700px;
  min-height: 300px;
  z-index: 3;
  background: #f7f8fb;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #e3e6f0;
  color: #4e73df;
  font-weight: 700;
  font-size: 17px;
  padding: 10px 25px;
  width: 100%;
  position: relative;
`;

const ExitButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  color: #4e73df;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px 0 50px;
`;

const Input = styled.input`
  width: 30%;
  padding: 10px 0;
  margin-bottom: 20px;
  text-align: center;
  :hover {
    border: 1px solid #4e73df;
  }
  :focus {
    border: 1px solid #4e73df;
  }
  border: ${(props) => props.theme.border};
  border-radius: 7px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Review = styled.input`
  width: 82%;
  padding: 20px 0;
  text-align: center;
  :hover {
    border: 1px solid #4e73df;
  }
  :focus {
    border: 1px solid #4e73df;
  }
  border: ${(props) => props.theme.border};
  border-radius: 7px;
`;

const Select = styled.select`
  width: 150px;
  padding: 10px 0;
  margin-bottom: 20px;
  border: ${(props) => props.theme.border};
  border-radius: 7px;
  :hover {
    opacity: 0.8;
    border: 1px solid #4e73df;
  }
  :focus {
    border: 1px solid #4e73df;
  }
  text-align-last: center;
`;

const AddButton = styled.button`
  width: 35px;
  height: 35px;
  font-size: 20px;
  background: #4e73df;
  color: white;
  border-radius: 5px;
  text-align: center;
  margin-left: 10px;
  position: absolute;
  bottom: 37px;
  transition: ease-in 0.1s;
  :hover {
    opacity: 0.8;
  }
`;

const Option = styled.option`
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px 0;
  margin: 10px 0;
  background: #4e73df;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  text-align: center;
  opacity: 1;
  transition: ease-in 0.1s;
  :hover {
    opacity: 0.8;
  }
`;

const Column = styled.div`
  position: relative;
`;

const ColumnWrapper = styled.div`
  display: flex;
`;
const StarContainer = styled.div`
  margin: 15px 0;
`;

const StarWrapper = styled.button<{ isCovered }>`
  background: none;
`;

interface IProps {
  review: any;
  setRating: any;
  exitWorkoutPopUp: any;
  onSubmit: any;
  workoutItem: any;
  addWorkoutItem: any;
  handleWorkoutChange: any;
  exercises: any;
  bodyParts: any;
  rating: any;
}

const CreateWorkoutPopUp: React.SFC<IProps> = ({
  review,
  setRating,
  rating,
  exitWorkoutPopUp,
  onSubmit,
  workoutItem,
  addWorkoutItem,
  handleWorkoutChange,
  exercises,
  bodyParts
}) => {
  const values = ["1", "2", "3", "4", "5"];
  return (
    <Container>
      <Header>
        워크아웃
        <ExitButton onClick={() => exitWorkoutPopUp()}>X</ExitButton>
      </Header>
      <Form onSubmit={onSubmit}>
        <ColumnWrapper>
          <Column>
            {workoutItem.map((item, index) => (
              <Wrapper key={index}>
                <Select
                  onChange={handleWorkoutChange}
                  className="title"
                  data-index={index}
                  required={true}
                >
                  <Option value="">- - 운동종목 - -</Option>
                  {bodyParts.map((bodyPart, idx) => (
                    <optgroup key={idx} label={bodyPart}>
                      {exercises[idx].map((exercise) => (
                        <Option key={exercise.id}>{exercise.title}</Option>
                      ))}
                    </optgroup>
                  ))}
                </Select>
                <Input
                  key={`weight-${index}`}
                  type={"number"}
                  step={5}
                  onChange={handleWorkoutChange}
                  placeholder={"weight"}
                  className="weight"
                  data-index={index}
                  required={true}
                />
                <Input
                  key={`set-${index}`}
                  type={"number"}
                  onChange={handleWorkoutChange}
                  placeholder={"set"}
                  className="set"
                  data-index={index}
                  required={true}
                />
              </Wrapper>
            ))}
          </Column>
          <Column>
            <AddButton onClick={addWorkoutItem}>+</AddButton>
          </Column>
        </ColumnWrapper>
        <Review
          placeholder={"review"}
          type={"text"}
          value={review.value}
          onChange={review.onChange}
          required={true}
        />
        <StarContainer>
          {values.map((value, index) => (
            <StarWrapper
              key={index}
              value={value}
              onClick={(event) => {
                event.preventDefault();
                setRating(value);
              }}
              isCovered={value <= rating}
            >
              {value <= rating ? <StarFull /> : <StarEmpty />}
            </StarWrapper>
          ))}
        </StarContainer>
        <SubmitButton>create</SubmitButton>
      </Form>
    </Container>
  );
};

export default CreateWorkoutPopUp;

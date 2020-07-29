import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  width: 400px;
  height: 150px;
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

const BodyPart = styled.button<{ isClicked: boolean }>`
  padding: 8px 13px;
  background: ${(props) => (props.isClicked ? "#4E73DF" : "white")};
  color: ${(props) => (props.isClicked ? "white" : "inherit")};
  border: ${(props) => props.theme.border};
  border-radius: 20px;
  margin-left: 5px;
  :hover {
    background: #4e73df;
    color: white;
  }
`;

const BodyPartContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const Form = styled.form`
  padding: 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  width: 250px;
  padding: 5px 10px;
  border: ${(props) => props.theme.border};
  :hover {
    border: 1px solid #4e73df;
  }
  :focus {
    border: 1px solid #4e73df;
  }
`;
const Button = styled.button`
  padding: 6px 10px;
  margin-left: 10px;
  margin-left: 5px;
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

interface IProps {
  setAction: any;
  bodyPart: any;
  title: any;
  onSubmit: any;
}

const CreateExercisePopUp: React.SFC<IProps> = ({
  setAction,
  bodyPart,
  title,
  onSubmit
}) => {
  return (
    <Container>
      <Header>
        Create new exercise!
        <ExitButton onClick={() => setAction("Normal")}>X</ExitButton>
      </Header>
      <BodyPartContainer>
        <BodyPart
          value={"Chest"}
          onClick={bodyPart.onClick}
          isClicked={bodyPart.value === "Chest"}
        >
          Chest
        </BodyPart>
        <BodyPart
          value={"Back"}
          onClick={bodyPart.onClick}
          isClicked={bodyPart.value === "Back"}
        >
          Back
        </BodyPart>
        <BodyPart
          value={"Shoulder"}
          onClick={bodyPart.onClick}
          isClicked={bodyPart.value === "Shoulder"}
        >
          Shoulder
        </BodyPart>
        <BodyPart
          value={"Leg"}
          onClick={bodyPart.onClick}
          isClicked={bodyPart.value === "Leg"}
        >
          Leg
        </BodyPart>
        <BodyPart
          value={"Arm"}
          onClick={bodyPart.onClick}
          isClicked={bodyPart.value === "Arm"}
        >
          Arm
        </BodyPart>
      </BodyPartContainer>
      <Form>
        <Input></Input>
        <Button>Create!</Button>
      </Form>
    </Container>
  );
};

export default CreateExercisePopUp;

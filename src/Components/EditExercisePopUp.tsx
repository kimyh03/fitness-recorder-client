import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  top: 30%;
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

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 250px;
  padding: 10px 10px;
  border: ${(props) => props.theme.border};
  text-align: center;
  border-radius: 7px;
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
  editTitle: any;
  onSubmit: any;
}

const EditExercisePopUp: React.SFC<IProps> = ({
  setAction,
  editTitle,
  onSubmit
}) => {
  return (
    <Container>
      <Header>
        Edit exercise!
        <ExitButton onClick={() => setAction("normal")}>X</ExitButton>
      </Header>
      <Form onSubmit={onSubmit}>
        <Input
          max={10}
          type={"text"}
          required={true}
          value={editTitle.value}
          onChange={editTitle.onChange}
          placeholder={"Exercise name"}
        ></Input>
        <Button>Edit!</Button>
      </Form>
    </Container>
  );
};

export default EditExercisePopUp;

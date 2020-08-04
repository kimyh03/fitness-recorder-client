import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  top: 20%;
  width: 250px;
  height: 400px;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px 0;
  margin-bottom: 20px;
  text-align: center;
  opacity: 0.7;
  border: ${(props) => props.theme.border};
  border-radius: 7px;
`;

const Button = styled.button`
  padding: 6px 10px;
  margin-top: 10px;
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
  bodyWeight: any;
  fat: any;
  muscle: any;
  bodyFatRate: any;
  onSubmit: any;
  date: any;
}

const CreateInbodyPopUp: React.SFC<IProps> = ({
  setAction,
  bodyWeight,
  muscle,
  fat,
  bodyFatRate,
  onSubmit,
  date
}) => {
  return (
    <Container>
      <Header>
        인바디
        <ExitButton onClick={() => setAction("normal")}>X</ExitButton>
      </Header>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder={"측정일시"}
          value={date.value}
          onChange={date.onChange}
          required={true}
          type={"date"}
        ></Input>
        <Input
          placeholder={"bodyWeight (kg)"}
          value={bodyWeight.value}
          onChange={bodyWeight.onChange}
          required={true}
          max={100}
          type={"number"}
        ></Input>
        <Input
          placeholder={"muscle (kg)"}
          value={muscle.value}
          onChange={muscle.onChange}
          required={true}
          max={100}
          type={"number"}
        ></Input>
        <Input
          placeholder={"fat (kg)"}
          value={fat.value}
          onChange={fat.onChange}
          required={true}
          max={100}
          type={"number"}
        ></Input>
        <Input
          placeholder={"bodyFatRate (%)"}
          value={bodyFatRate.value}
          onChange={bodyFatRate.onChange}
          required={true}
          max={100}
          type={"number"}
        ></Input>
        <Button>기록하기</Button>
      </Form>
    </Container>
  );
};

export default CreateInbodyPopUp;

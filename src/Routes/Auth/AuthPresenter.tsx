import React from "react";
import Button from "src/Components/Button";
import styled from "styled-components";
import Input from "../../Components/Input";

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  max-width: 350px;
  width: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: white;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const Form = styled.form`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StateChanger = styled.span`
  opacity: 0.7;
`;

const StateText = styled.span`
  color: ${(props) => props.theme.deepBlueColor};
  margin: 10px;
  :hover {
    cursor: pointer;
  }
`;

export default ({
  email,
  password,
  confirmPassword,
  username,
  action,
  setAction,
  onSubmit
}) => (
  <Container>
    <Box>
      {action === "logIn" && (
        <Form onSubmit={onSubmit}>
          <Input
            type={"email"}
            value={email.value}
            placeholder={"이메일"}
            required={true}
            onChange={email.onChange}
          />
          <Input
            type={"password"}
            value={password.value}
            placeholder={"비밀번호"}
            required={true}
            onChange={password.onChange}
          />
          <Button text={"로그인"} />
          <StateChanger>
            아이디가 없으신가요?{" "}
            <StateText onClick={() => setAction("signUp")}>회원가입</StateText>
          </StateChanger>
        </Form>
      )}
      {action === "signUp" && (
        <Form onSubmit={onSubmit}>
          <Input
            type={"email"}
            value={email.value}
            placeholder={"이메일"}
            required={true}
            onChange={email.onChange}
          />
          <Input
            type={"password"}
            value={password.value}
            placeholder={"비밀번호"}
            required={true}
            onChange={password.onChange}
          />
          <Input
            type={"password"}
            value={confirmPassword.value}
            placeholder={"비밀번호 확인"}
            required={true}
            onChange={confirmPassword.onChange}
          />
          <Input
            type={"text"}
            value={username.value}
            placeholder={"이름"}
            required={true}
            onChange={username.onChange}
          />
          <Button text={"회원가입"} />
          <StateChanger>
            이미 아이디가 있으신가요?{" "}
            <StateText onClick={() => setAction("logIn")}>로그인</StateText>
          </StateChanger>
        </Form>
      )}
    </Box>
  </Container>
);

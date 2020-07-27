import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UseInput from "src/Hooks/UseInput";
import AuthPresenter from "./AuthPresenter";

const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

const SIGN_UP = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      ok
    }
  }
`;

const DOBLE_CHECK_EMAIL = gql`
  mutation doubleCheckEmail($email: String!) {
    doubleCheckEmail(email: $email) {
      ok
    }
  }
`;

export default () => {
  const email = UseInput("");
  const password = UseInput("");
  const username = UseInput("");
  const confirmPassword = UseInput("");
  const [action, setAction] = useState("logIn");
  const [logIn] = useMutation(LOG_IN, {
    variables: { email: email.value, password: password.value }
  });
  const [localLogIn] = useMutation(LOCAL_LOG_IN);
  const [signUp] = useMutation(SIGN_UP, {
    variables: {
      email: email.value,
      username: username.value,
      password: password.value
    }
  });

  const [doubleCheckEmail] = useMutation(DOBLE_CHECK_EMAIL, {
    variables: { email: email.value }
  });

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    if (action === "logIn") {
      try {
        const {
          data: {
            signIn: { token }
          }
        } = await logIn();
        if (token) {
          await localLogIn({ variables: { token } });
          toast.success("반갑습니다! 오늘도 즐거운 하루를 만드세요.");
        } else {
          toast.error("이메일 혹은 비밀번호를 찾을 수 없습니다.");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else if (action === "signUp") {
      if (password.value === confirmPassword.value) {
        try {
          const {
            data: {
              doubleCheckEmail: { ok }
            }
          } = await doubleCheckEmail();
          if (ok) {
            await signUp();
            toast.success("성공적으로 회원가입을 완료 했습니다!");
            setTimeout(setAction("logIn"), 2000);
          } else {
            toast.error("이미 사용중인 이메일 주소 입니다.");
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <AuthPresenter
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      username={username}
      action={action}
      onSubmit={onSubmit}
      setAction={setAction}
    />
  );
};

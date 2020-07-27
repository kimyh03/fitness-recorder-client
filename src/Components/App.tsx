import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";

const GET_ISLOGGEDIN = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {
  const { data } = useQuery(GET_ISLOGGEDIN);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router isLoggedIn={data?.isLoggedIn} />
        <ToastContainer position={"bottom-left"} />
      </>
    </ThemeProvider>
  );
};

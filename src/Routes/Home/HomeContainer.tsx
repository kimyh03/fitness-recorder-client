import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import CreateExercisePopUp from "src/Components/CreateExercisePopUp";
import Loader from "src/Components/Loader";
import UseButton from "src/Hooks/UseButton";
import UseInput from "src/Hooks/UseInput";
import styled from "styled-components";
import HomePresenter from "./HomePresenter";

const Blinder = styled.div`
  position: fixed;
  top: 70px;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.5;
  z-index: 2;
`;

const GET_MY_DATA = gql`
  query getMyData {
    getMe {
      user {
        username
        exercises {
          id
          bodyPart
          title
          latestRecord
        }
      }
    }
  }
`;

export default () => {
  const [action, setAction] = useState("Normal");
  const bodyPart = UseButton();
  const title = UseInput("");
  /*
  const bodyWeight = UseInput("");
  const fat = UseInput("");
  const muscle = UseInput("");
  const bodyFatRate = UseInput("");

  const review = UseInput("");
  const rating = UseButton("");
  const title = UseInput("");
  const weight = UseInput("");
  const set = UseInput("");
  const time = UseInput("");
*/
  const onSubmit = () => {
    if (action === "Exercise") {
      setAction("Normal");
    } else if (action === "Workout") {
      setAction("Normal");
    } else if (action === "Inbody") {
      setAction("Normal");
    }
  };

  const sortExercises = (exercise: any) => {
    const ChestExercises = exercise.filter((item) => item.bodyPart === "Chest");
    const backExercises = exercise.filter((item) => item.bodyPart === "Back");
    const shoulderExercises = exercise.filter(
      (item) => item.bodyPart === "Shoulder"
    );
    const legExercises = exercise.filter((item) => item.bodyPart === "Leg");
    const armExercises = exercise.filter((item) => item.bodyPart === "Arm");
    return {
      chest: ChestExercises,
      back: backExercises,
      shoulder: shoulderExercises,
      leg: legExercises,
      arm: armExercises
    };
  };

  const { loading, data } = useQuery(GET_MY_DATA);
  if (loading) return <Loader />;
  else if (!loading && data && data.getMe && data.getMe.user) {
    const {
      getMe: {
        user: { username, exercises }
      }
    } = data;
    const sortedExercises = sortExercises(exercises);
    if (action === "Normal") {
      return (
        <HomePresenter
          username={username}
          exercises={sortedExercises}
          setAction={setAction}
        />
      );
    } else if (action === "Exercise") {
      return (
        <>
          <HomePresenter
            username={username}
            exercises={sortedExercises}
            setAction={setAction}
          />
          <Blinder />
          <CreateExercisePopUp
            setAction={setAction}
            bodyPart={bodyPart}
            title={title}
            onSubmit={onSubmit}
          />
        </>
      );
    } else return null;
  } else return null;
};

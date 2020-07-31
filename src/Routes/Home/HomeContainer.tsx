import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateExercisePopUp from "src/Components/CreateExercisePopUp";
import CreateInbodyPopUp from "src/Components/CreateInbodyPopUp";
import CreateWorkoutPopUp from "src/Components/CreateWorkoutPopUp";
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
      latestInbodyData {
        id
        weight
        fat
        muscle
        bodyFatRate
        createdAt
      }
    }
  }
`;

const CREATE_EXERCISE = gql`
  mutation createExercise($bodyPart: String!, $title: String!) {
    createExercise(bodyPart: $bodyPart, title: $title) {
      ok
    }
  }
`;

const CREATE_INBODY = gql`
  mutation createInbodyData(
    $weight: String!
    $fat: String!
    $muscle: String!
    $bodyFatRate: String!
  ) {
    createInbodyData(
      weight: $weight
      fat: $fat
      muscle: $muscle
      bodyFatRate: $bodyFatRate
    ) {
      ok
    }
  }
`;

export default () => {
  const [action, setAction] = useState("Normal");
  const bodyPart = UseButton();
  const title = UseInput("");
  const bodyWeight = UseInput("");
  const fat = UseInput("");
  const muscle = UseInput("");
  const bodyFatRate = UseInput("");
  const { loading, data, refetch } = useQuery(GET_MY_DATA);
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    variables: { bodyPart: bodyPart.value, title: title.value }
  });
  const [createInbody] = useMutation(CREATE_INBODY, {
    variables: {
      weight: bodyWeight.value,
      fat: fat.value,
      muscle: muscle.value,
      bodyFatRate: bodyFatRate.value
    }
  });

  const review = UseInput("");
  const rating = UseButton();
  // const weight = UseInput("");
  // const set = UseInput("");
  // const time = UseInput("");

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    if (action === "Exercise") {
      try {
        await createExercise();
        await refetch();
        bodyPart.setValue("");
        title.setValue("");
        toast.success("나의 운동이 추가 되었습니다!");
        setAction("Normal");
      } catch (error) {
        toast.error(error.message);
      }
    } else if (action === "Workout") {
      setAction("Normal");
    } else if (action === "Inbody") {
      try {
        await createInbody();
        await refetch();
        bodyWeight.setValue("");
        fat.setValue("");
        muscle.setValue("");
        bodyFatRate.setValue("");
        toast.success("인바디 데이터가 저장되었습니다!");
        setAction("Normal");
      } catch (error) {
        toast.error(error.message);
      }
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

  if (loading) return <Loader />;
  else if (!loading && data && data.getMe && data.getMe.user) {
    const {
      getMe: {
        user: { username, exercises },
        latestInbodyData
      }
    } = data;
    const sortedExercises = sortExercises(exercises);
    if (action === "Normal") {
      return (
        <HomePresenter
          username={username}
          exercises={sortedExercises}
          setAction={setAction}
          inbody={latestInbodyData[0]}
        />
      );
    } else if (action === "Exercise") {
      return (
        <>
          <HomePresenter
            username={username}
            exercises={sortedExercises}
            setAction={setAction}
            inbody={latestInbodyData[0]}
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
    } else if (action === "Workout") {
      return (
        <>
          <HomePresenter
            username={username}
            exercises={sortedExercises}
            setAction={setAction}
            inbody={latestInbodyData[0]}
          />
          <Blinder />
          <CreateWorkoutPopUp
            review={review}
            rating={rating}
            setAction={setAction}
            onSubmit={onSubmit}
          />
        </>
      );
    } else if (action === "Inbody") {
      return (
        <>
          <HomePresenter
            username={username}
            exercises={sortedExercises}
            setAction={setAction}
            inbody={latestInbodyData[0]}
          />
          <Blinder />
          <CreateInbodyPopUp
            setAction={setAction}
            bodyWeight={bodyWeight}
            fat={fat}
            muscle={muscle}
            bodyFatRate={bodyFatRate}
            onSubmit={onSubmit}
          />
        </>
      );
    } else return null;
  } else return null;
};

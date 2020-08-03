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
import sortExercises from "src/utils/sortExercises";
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
      error
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

const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: String!) {
    deleteExercise(id: $id) {
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
  const types = ["exercise", "workout", "inbody"];
  const bodyParts = ["chest", "back", "shoulder", "leg", "arm"];
  const [action, setAction] = useState("normal");
  const bodyPart = UseButton();
  const title = UseInput("");
  const bodyWeight = UseInput("");
  const fat = UseInput("");
  const muscle = UseInput("");
  const bodyFatRate = UseInput("");
  const { loading, data, refetch } = useQuery(GET_MY_DATA);
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    variables: { bodyPart: bodyPart.value, title: title.value },
    onError(error) {
      throw new Error(error.message.substring(15));
    }
  });
  const [deleteExercise] = useMutation(DELETE_EXERCISE);
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

  const onClick = async (event) => {
    if (window.confirm("종목을 삭제하면 데이터를 모두 잃습니다. 괜찮니?")) {
      const {
        target: { value }
      } = event;
      try {
        await deleteExercise({ variables: { id: value } });
        await refetch();
        toast.success("삭제오케이");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    if (action === "exercise") {
      try {
        if (bodyPart.value === "") toast.error("운동부위를 선택해주세요");
        else {
          await createExercise();
          await refetch();
          bodyPart.setValue("");
          title.setValue("");
          toast.success("나의 운동이 추가 되었습니다!");
          setAction("normal");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else if (action === "workout") {
      setAction("normal");
    } else if (action === "inbody") {
      try {
        await createInbody();
        await refetch();
        bodyWeight.setValue("");
        fat.setValue("");
        muscle.setValue("");
        bodyFatRate.setValue("");
        toast.success("인바디 데이터가 저장되었습니다!");
        setAction("normal");
      } catch (error) {
        toast.error(error.message);
      }
    }
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
    return (
      <>
        <HomePresenter
          username={username}
          exercises={sortedExercises}
          setAction={setAction}
          inbody={latestInbodyData[0]}
          onClick={onClick}
          types={types}
          bodyParts={bodyParts}
        />
        {action !== "normal" && <Blinder />}
        {action === "exercise" && (
          <CreateExercisePopUp
            setAction={setAction}
            bodyPart={bodyPart}
            title={title}
            onSubmit={onSubmit}
          />
        )}
        {action === "workout" && (
          <CreateWorkoutPopUp
            review={review}
            rating={rating}
            setAction={setAction}
            onSubmit={onSubmit}
          />
        )}
        {action === "inbody" && (
          <CreateInbodyPopUp
            setAction={setAction}
            bodyWeight={bodyWeight}
            fat={fat}
            muscle={muscle}
            bodyFatRate={bodyFatRate}
            onSubmit={onSubmit}
          />
        )}
      </>
    );
  } else return null;
};

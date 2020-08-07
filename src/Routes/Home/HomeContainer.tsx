import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateExercisePopUp from "src/Components/CreateExercisePopUp";
import CreateInbodyPopUp from "src/Components/CreateInbodyPopUp";
import CreateWorkoutPopUp from "src/Components/CreateWorkoutPopUp";
import EditExercisePopUp from "src/Components/EditExercisePopUp";
import Loader from "src/Components/Loader";
import UseButton from "src/Hooks/UseButton";
import UseInput from "src/Hooks/UseInput";
import sortByBodyPart from "src/utils/sortByBodyPart";
import styled from "styled-components";
import HomePresenter from "./HomePresenter";
import {
  CREATE_EXERCISE,
  CREATE_INBODY,
  CREATE_WORKOUT,
  DELETE_EXERCISE,
  EDIT_EXERCISE,
  GET_MY_DATA,
  GET_WORKOUT
} from "./HomeQueries";

const Blinder = styled.div`
  position: fixed;
  top: 70px;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.5;
  z-index: 2;
`;

export default () => {
  const types = ["exercise", "workout", "inbody"];
  const bodyParts = ["chest", "back", "shoulder", "leg", "arm"];
  const [action, setAction] = useState("normal");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const bodyPart = UseButton();
  const title = UseInput("");
  const editTitle = UseInput("");
  const [exerciseID, setExerciseID] = useState("");

  const date = UseInput("");
  const bodyWeight = UseInput("");
  const fat = UseInput("");
  const muscle = UseInput("");
  const bodyFatRate = UseInput("");

  const blankWorkoutItem = { title: "", weight: 0, set: 0 };
  const [workoutItem, setWorkoutItem] = useState([{ ...blankWorkoutItem }]);
  const [rating, setRating] = useState("");
  const review = UseInput("");

  const [isCompleted, setIsCompleted] = useState(false);
  const { data: workoutData } = useQuery(GET_WORKOUT, {
    variables: { year, month },
    onCompleted: () => setIsCompleted(true)
  });
  const { loading, data, refetch } = useQuery(GET_MY_DATA);
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    onError(error) {
      throw new Error(error.message.substring(15));
    }
  });
  const [createWorkout] = useMutation(CREATE_WORKOUT);
  const [createInbody] = useMutation(CREATE_INBODY);
  const [editExerciseMutation] = useMutation(EDIT_EXERCISE);
  const [deleteExerciseMutation] = useMutation(DELETE_EXERCISE);

  const toNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const toLastMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const addWorkoutItem = (event) => {
    event.preventDefault();
    setWorkoutItem([...workoutItem, { ...blankWorkoutItem }]);
  };
  const handleWorkoutChange = (event) => {
    const {
      target: {
        value,
        className,
        dataset: { index }
      }
    } = event;
    const updatedWorkout = [...workoutItem];
    if (className.substring(17) !== "title") {
      updatedWorkout[index][className.substring(17)] = Number(value);
    } else {
      updatedWorkout[index][className.substring(17)] = value;
    }
    setWorkoutItem(updatedWorkout);
  };

  const clearWorkoutPopUp = async () => {
    setWorkoutItem([{ ...blankWorkoutItem }]);
    review.setValue("");
    setRating("");
    setAction("normal");
  };

  const deleteExercise = async (event) => {
    if (window.confirm("종목을 삭제하면 데이터를 모두 잃습니다. 괜찮니?")) {
      const {
        target: { value }
      } = event;
      try {
        await deleteExerciseMutation({ variables: { id: value } });
        await refetch();
        toast.success("삭제오케이");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (action === "exercise") {
      try {
        if (bodyPart.value === "") toast.error("운동부위를 선택해주세요");
        else {
          await createExercise({
            variables: { bodyPart: bodyPart.value, title: title.value }
          });
          await refetch();
          bodyPart.setValue("");
          title.setValue("");
          toast.success("나의 운동이 추가 되었습니다!");
          setAction("normal");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else if (action === "editExercise") {
      try {
        await editExerciseMutation({
          variables: { id: exerciseID, title: editTitle.value }
        });
        toast.success("나의 종목이 성공적으로 수정 되었습니다!");
        await refetch();
        editTitle.setValue("");
        setAction("normal");
      } catch (error) {
        toast.error(error.message);
      }
    } else if (action === "workout") {
      if (rating === "") {
        toast.error("오늘 운동의 평점을 선택해 주세요");
      } else {
        try {
          await createWorkout({
            variables: {
              routineItems: workoutItem,
              review: review.value,
              rating
            }
          });
          await refetch();
          clearWorkoutPopUp();
          toast.success("워크아웃이 성공적으로 등록 되었습니다!");
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else if (action === "inbody") {
      try {
        await createInbody({
          variables: {
            weight: bodyWeight.value,
            fat: fat.value,
            muscle: muscle.value,
            bodyFatRate: bodyFatRate.value,
            recordDate: date.value
          }
        });
        await refetch();
        bodyWeight.setValue("");
        date.setValue("");
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
  else if (isCompleted && !loading && data && data.getMe && data.getMe.user) {
    const {
      getMe: {
        user: { username, exercises },
        latestInbodyData
      }
    } = data;
    const {
      getWorkOutDataForHome: { records, workouts }
    } = workoutData;
    const sortedExercises = sortByBodyPart(exercises, bodyParts);
    const sortedRecords = sortByBodyPart(records, bodyParts);
    return (
      <>
        <HomePresenter
          username={username}
          exercises={sortedExercises}
          setAction={setAction}
          inbody={latestInbodyData[0]}
          deleteExercise={deleteExercise}
          types={types}
          bodyParts={bodyParts}
          workouts={workouts}
          records={sortedRecords}
          toNextMonth={toNextMonth}
          toLastMonth={toLastMonth}
          year={year}
          month={month}
          setExerciseID={setExerciseID}
        />
        {action !== "normal" && <Blinder />}
        {action === "exercise" && (
          <CreateExercisePopUp
            setAction={setAction}
            bodyPart={bodyPart}
            title={title}
            onSubmit={onSubmit}
            bodyParts={bodyParts}
          />
        )}
        {action === "editExercise" && (
          <EditExercisePopUp
            setAction={setAction}
            editTitle={editTitle}
            onSubmit={onSubmit}
          />
        )}
        {action === "workout" && (
          <CreateWorkoutPopUp
            review={review}
            setRating={setRating}
            rating={rating}
            exitWorkoutPopUp={clearWorkoutPopUp}
            onSubmit={onSubmit}
            workoutItem={workoutItem}
            addWorkoutItem={addWorkoutItem}
            handleWorkoutChange={handleWorkoutChange}
            exercises={sortedExercises}
            bodyParts={bodyParts}
          />
        )}
        {action === "inbody" && (
          <CreateInbodyPopUp
            setAction={setAction}
            bodyWeight={bodyWeight}
            fat={fat}
            muscle={muscle}
            bodyFatRate={bodyFatRate}
            date={date}
            onSubmit={onSubmit}
          />
        )}
      </>
    );
  } else return null;
};

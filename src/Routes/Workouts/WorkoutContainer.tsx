import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import Loader from "src/Components/Loader";
import WorkoutPresenter from "./WorkoutPresenter";

const GET_WORKOUT_DATA = gql`
  query getWorkoutData($year: Float!, $month: Float!) {
    getWorkoutData(year: $year, month: $month) {
      workout {
        id
        review
        rating
        createdAt
        records {
          title
          weight
          set
        }
      }
    }
  }
`;

export default () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

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

  const { loading, data } = useQuery(GET_WORKOUT_DATA, {
    variables: { year, month }
  });

  if (!loading && data && data.getWorkoutData && data.getWorkoutData.workout) {
    const {
      getWorkoutData: { workout }
    } = data;
    return (
      <WorkoutPresenter
        year={year}
        month={month}
        toNextMonth={toNextMonth}
        toLastMonth={toLastMonth}
        workout={workout}
      />
    );
  } else {
    return <Loader />;
  }
};

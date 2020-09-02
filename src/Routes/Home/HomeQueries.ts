import { gql } from "apollo-boost";

export const GET_MY_DATA = gql`
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
        weight
        fat
        muscle
        bodyFatRate
        recordDate
      }
      error
    }
  }
`;

export const CREATE_EXERCISE = gql`
  mutation createExercise($bodyPart: String!, $title: String!) {
    createExercise(bodyPart: $bodyPart, title: $title) {
      ok
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: String!) {
    deleteExercise(id: $id) {
      ok
    }
  }
`;

export const CREATE_INBODY = gql`
  mutation createInbodyData(
    $weight: String!
    $fat: String!
    $muscle: String!
    $bodyFatRate: String!
    $recordDate: String!
  ) {
    createInbodyData(
      weight: $weight
      fat: $fat
      muscle: $muscle
      bodyFatRate: $bodyFatRate
      recordDate: $recordDate
    ) {
      ok
    }
  }
`;

export const GET_WORKOUT = gql`
  query getWorkOutDataForHome($year: Float!, $month: Float!) {
    getWorkOutDataForHome(year: $year, month: $month) {
      workout {
        review
        rating
      }
      record {
        bodyPart
        set
      }
    }
  }
`;

export const CREATE_WORKOUT = gql`
  mutation createWorkout(
    $routineItems: [RoutineItem!]!
    $review: String!
    $rating: Float!
  ) {
    createWorkout(
      routineItems: $routineItems
      review: $review
      rating: $rating
    ) {
      ok
    }
  }
`;

export const EDIT_EXERCISE = gql`
  mutation editExercise($id: String!, $title: String!) {
    editExercise(id: $id, title: $title) {
      ok
    }
  }
`;

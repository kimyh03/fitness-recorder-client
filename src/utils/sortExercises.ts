const sortExercises = (exercise: any) => {
  const chestExercises = exercise.filter((item) => item.bodyPart === "Chest");
  const backExercises = exercise.filter((item) => item.bodyPart === "Back");
  const shoulderExercises = exercise.filter(
    (item) => item.bodyPart === "Shoulder"
  );
  const legExercises = exercise.filter((item) => item.bodyPart === "Leg");
  const armExercises = exercise.filter((item) => item.bodyPart === "Arm");
  return [
    chestExercises,
    backExercises,
    shoulderExercises,
    legExercises,
    armExercises
  ];
};

export default sortExercises;

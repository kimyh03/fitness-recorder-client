const sortExercises = (exercise, bodyParts) => {
  const chestExercises = exercise.filter(
    (item) => item.bodyPart === bodyParts[0]
  );
  const backExercises = exercise.filter(
    (item) => item.bodyPart === bodyParts[1]
  );
  const shoulderExercises = exercise.filter(
    (item) => item.bodyPart === bodyParts[2]
  );
  const legExercises = exercise.filter(
    (item) => item.bodyPart === bodyParts[3]
  );
  const armExercises = exercise.filter(
    (item) => item.bodyPart === bodyParts[4]
  );
  return [
    chestExercises,
    backExercises,
    shoulderExercises,
    legExercises,
    armExercises
  ];
};

export default sortExercises;

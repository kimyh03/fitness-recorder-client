export default (inputArray, bodyParts) => {
  const chest = inputArray.filter((item) => item.bodyPart === bodyParts[0]);
  const back = inputArray.filter((item) => item.bodyPart === bodyParts[1]);
  const shoulder = inputArray.filter((item) => item.bodyPart === bodyParts[2]);
  const leg = inputArray.filter((item) => item.bodyPart === bodyParts[3]);
  const arm = inputArray.filter((item) => item.bodyPart === bodyParts[4]);
  return [chest, back, shoulder, leg, arm];
};

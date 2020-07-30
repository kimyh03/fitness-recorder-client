import { useState } from "react";

export default () => {
  const [value, setValue] = useState("");

  const onClick = (event) => {
    const {
      target: { value: newValue }
    } = event;
    setValue(newValue);
  };

  return { value, onClick, setValue };
};

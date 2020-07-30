import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return { value, onChange, setValue };
};

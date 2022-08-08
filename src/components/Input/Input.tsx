import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type InputTypes = "password" | "text";

export interface InputProps {
  label: string;
  type: InputTypes;
  initialValue: string;
  ariaDescription?: string;
}

const Input = (props: InputProps) => {
  const { type, initialValue, ariaDescription, ...otherprops } = props;
  const hasAriaDescription = ariaDescription !== undefined;
  const ariaDescriptionID = hasAriaDescription ? uuidv4() : undefined;
  const [value, setValue] = useState('');

  const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  return (
    <div className="tcg-input">
      <label>
        <div>{props.label}</div>
        <div>
          <input type={type} value={value} aria-describedBy={ariaDescriptionID} onChange={onChange}></input>
        </div>
      </label>
      {ariaDescription !== undefined && <div id={ariaDescriptionID}>{ariaDescription}</div>}
    </div>
  );
};

export default Input;

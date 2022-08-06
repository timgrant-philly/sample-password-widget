import React from "react";
import { v4 as uuidv4 } from "uuid";

export type InputTypes = "password" | "text";

export interface InputProps {
  label: string;
  type: InputTypes;
  value: string;
  ariaDescription?: string;
}

const Input = (props: InputProps) => {
  const { type, value, ariaDescription, ...otherprops } = props;
  const hasAriaDescription = ariaDescription !== undefined;
  const ariaDescriptionID = hasAriaDescription ? uuidv4() : undefined;

  return (
    <div>
      <label>
        <div>{props.label}</div>
        <div>
          <input type={type} value={value} aria-describedBy={ariaDescriptionID}></input>
        </div>
      </label>
      {ariaDescription !== undefined && <div id={ariaDescriptionID}>{ariaDescription}</div>}
    </div>
  );
};

export default Input;

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../Button";


export interface InputProps {
  label: string;
  ariaDescription?: string;
}

interface RuleType {
  name: string;
  pattern: RegExp;
  description: string;
}

const rules = [{
  name: 'Minimum length',
  pattern: /.{6,}/,
  description: 'Password has a min length of 6 characters',
},
{
  name: 'Uppercase',
  pattern: /[A-Z]/,
  description: 'Password has at least 1 uppercase character',
},
{
  name: 'Lowercase',
  pattern: /[a-z]/,
  description: 'Password has at least 1 lowercase character',
},
{
  name: 'Number',
  pattern: /\d/,
  description: 'Password has at least 1 number',
},
{
  name: '',
  pattern: /\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\[\}\]\|\:\;\"\'\<\,\>\./,
  description: `Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)`,
},
]

const Password = (props: InputProps) => {
  const { label, ...otherprops } = props;
  const ariaDescriptionID = uuidv4();
  const [value, setValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const onConfirmChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmValue(event.target.value);
  };

  const onSubmit = () => {
    console.log("Submitted");
    const myValue = value;
    const errors: string[] = [];

    if (myValue !== confirmValue) {
      errors.push('Both inputs must match');
    }

    rules.forEach(rule => {
      const { name, pattern, description } = rule;

      if (!myValue.match(pattern)) {
        errors.push(description);
      }
    });

    if (errors.length > 0) {
      setValidationMessages(errors);
    } else {
      setValidationMessages(['Success']);
    }
  }

  const renderValidationMessages = () => {
    return validationMessages.map((m) => {
      return <div>{m}</div>
    })
  }

  return (
    <div className="tcg-input">
      <label>
        <div>{props.label}</div>
        <div>
          <input id="password" value={value} aria-describedBy={ariaDescriptionID} onChange={onChange}></input>
        </div>
      </label>

      <label>
        <div>Confirm Password</div>
        <div>
          <div>
            <input id="password-confirm" value={confirmValue} onChange={onChange}></input>
          </div>
        </div>
      </label>

      <div id={ariaDescriptionID}>
        {validationMessages.length > 0 ? renderValidationMessages() : ''}
      </div>

      <label>
        <Button type="submit" children="Submit" onClick={onSubmit} />
      </label>
    </div>
  );
};

export default Password;

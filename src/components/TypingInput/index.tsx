import React from "react";
import "./TypingInput.css";

type Props = {
  inputText: string;
  onInputChange: (eventInput: string) => void;
};

const TypingInput = ({ inputText, onInputChange }: Props) => {
  return (
    <input
      className="TypingInput"
      type="text"
      onChange={(e) => onInputChange(e.target.value)}
      value={inputText}
    />
  );
};

export default TypingInput;

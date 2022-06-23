import React from "react";
import Loading from "../Loading";
import "./TypingText.css";

type Props = {
  isLoading: boolean;
  wordsData: string[];
};

const TypingText = ({ isLoading, wordsData }: Props) => {
  return (
    <div className="TypingText">
      {isLoading ? (
        <Loading />
      ) : (
        wordsData.map((word: string, index) => {
          return <p key={index}>{word}</p>;
        })
      )}
    </div>
  );
};

export default TypingText;

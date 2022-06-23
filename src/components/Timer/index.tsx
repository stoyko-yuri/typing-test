import React from "react";
import "./Timer.css";

type Props = {
  seconds: number;
};

const Timer = ({ seconds }: Props) => {
  return <div className="Timer">{seconds}</div>;
};

export default Timer;

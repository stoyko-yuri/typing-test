import React, { useEffect, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import TypingInput from "./components/TypingInput";
import TypingText from "./components/TypingText";

const App = () => {
  const [seconds, setSeconds] = useState<number>(60);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [inputText, setInputText] = useState<string>("");
  const [wordsData, setWordsData] = useState<string[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true);
      await fetch("https://random-word-api.herokuapp.com/all")
        .then((res) => res.json())
        .then((res) => {
          const result = res.filter((word: string) => word.length < 6);
          getRandomWord(result);
        })
        .then(() => setIsLoading(false));
    };

    fetchWords();
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      await fetch("https://random-word-api.herokuapp.com/all")
        .then((res) => res.json())
        .then((res) => {
          const result = res.filter((word: string) => word.length < 6);
          wordsData.length <= 20 && getRandomWord(result);
        });
    };

    fetchWords();
  }, [wordsData]);

  useEffect(() => {
    if (seconds > 0 && isStarted) {
      setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    } else {
      setIsStarted(false);
    }
  }, [seconds, isStarted]);

  const getRandomWord = (array: string[]) => {
    for (let i = 0; i < 30; i++) {
      const randomNum = Math.floor(Math.random() * array.length);
      setWordsData((prev) => [...prev, array[randomNum]]);
    }
  };

  const onInputChange = (eventInput: string) => {
    if (eventInput.length > 0 && !isStarted) setIsStarted(true);

    setInputText(eventInput);

    if (eventInput.includes(" ")) {
      if (eventInput === wordsData[0] + " " && isStarted) {
        setCounter((prev) => prev + wordsData[0].length);
        wordsData.shift();
        setWordsData([...wordsData]);
        setInputText("");
      } else {
        wordsData.shift();
        setWordsData([...wordsData]);
        setInputText("");
      }
    }
  };

  const restartTest = () => {
    setSeconds(60);
    setCounter(0);
    setInputText("");
  };

  return (
    <div className="App">
      <div className="TypingTest">
        <p className="TypingWordCounter">{Math.floor(counter * 0.2)}</p>
        <Timer seconds={seconds} />
        {seconds ? (
          <TypingText isLoading={isLoading} wordsData={wordsData} />
        ) : (
          <div className="TypingTimeIsOut">
            <p>Time is out. Your WPM: {Math.floor(counter * 0.2)}</p>
            <button className="TypingAgainButton" onClick={restartTest}>
              Try again
            </button>
          </div>
        )}
        <TypingInput inputText={inputText} onInputChange={onInputChange} />
      </div>
    </div>
  );
};

export default App;

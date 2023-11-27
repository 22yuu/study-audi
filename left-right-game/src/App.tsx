import { useEffect, useState } from "react";
import Game from "./game/game";
import ArrowBeat from "./game/arrow-beat";
import styled from "styled-components";
import useTimer from "./hooks/useTimer";
import LogoIcon from "./assets/icons/LogoIcon";

const game = new Game();
const allArrowBeats = game.generateBeats();

// components
const MainWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const ArrowBeatIcon = styled.div`
  width: 70px;
  height: 70px;
  border: 5px solid #222;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  margin: 10px;
`;

function App() {
  const [currentUserInput, setCurrentUserInput] = useState("");
  const [beats, setBeats] = useState<ArrowBeat[]>(allArrowBeats);
  const [currentBeats, setCurrentBeats] = useState<ArrowBeat[]>(
    allArrowBeats.slice(-5)
  );
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const {
    isTimerStart,
    timeText,
    startTimer,
    endTimer,
    addTime,
    minusTime,
    initTimer,
  } = useTimer();

  const inputHandler = (e: KeyboardEvent) => {
    const key = e.key;

    if (key !== "ArrowLeft" && key !== "ArrowRight") {
      setCurrentUserInput("");
      return;
    }

    if (!isTimerStart) {
      startTimer();
    }

    setCurrentUserInput(key);
    correctTarget(key);
  };

  const correctTarget = (key: string) => {
    if (key === currentBeats[currentBeats.length - 1].arrow) {
      allArrowBeats.pop();
      setBeats(allArrowBeats);
      setCurrentBeats(beats.slice(-5));

      setCombo((combo) => {
        const currentCombo = combo + 1;
        setMaxCombo((prev) => Math.max(prev, currentCombo));
        setScore((prev) => {
          const currentScore = prev + (10 * combo + Math.abs(10 - combo));
          // console.log(`combo ${combo} : ${10 * combo + Math.abs(10 - combo)}`);
          setMaxScore((prev) => Math.max(prev, currentScore));

          return currentScore;
        });
        return currentCombo;
      });

      if (isTimerStart) {
        addTime();
      }
    } else {
      setCombo(0);
      minusTime();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", inputHandler);
    initTimer();
    return () => {
      document.removeEventListener("keydown", inputHandler);
    };
  }, [currentBeats]);

  return (
    <MainWrapper>
      <LogoIcon />
      {currentBeats.map((arrow) => {
        return (
          <ArrowBeatIcon data-id={arrow.id} key={arrow.id}>
            {arrow.arrow === "ArrowLeft" ? "←" : "→"}
          </ArrowBeatIcon>
        );
      })}

      <div>current input : {currentUserInput === "ArrowLeft" ? "←" : "→"}</div>
      <div style={{ position: "absolute", left: "0px", bottom: "20px" }}>
        score : {score}
      </div>
      <div style={{ position: "absolute", right: "0px", bottom: "20px" }}>
        combo : {combo}
      </div>
      <div style={{ position: "absolute", left: "0px", bottom: "50px" }}>
        max score : {maxScore}
      </div>
      <div style={{ position: "absolute", right: "0px", bottom: "50px" }}>
        max combo : {maxCombo}
      </div>
      <span>{timeText}</span>
    </MainWrapper>
  );
}

export default App;

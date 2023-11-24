import { useEffect, useState } from "react";
import Game from "./game/game";
import ArrowBeat from "./game/arrow-beat";

const game = new Game();
const allArrowBeats = game.generateBeats();

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

  const inputHandler = (e: KeyboardEvent) => {
    const key = e.key;

    if (key !== "ArrowLeft" && key !== "ArrowRight") {
      setCurrentUserInput("");
      return;
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
          console.log(`combo ${combo} : ${10 * combo + Math.abs(10 - combo)}`);
          setMaxScore((prev) => Math.max(prev, currentScore));
          return currentScore;
        });

        return currentCombo;
      });
    } else {
      setCombo(0);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", inputHandler);

    return () => {
      document.removeEventListener("keydown", inputHandler);
    };
  }, [currentBeats]);

  return (
    <div className="flex flex-col ">
      hello!
      {currentBeats.map((arrow) => {
        return (
          <div data-id={arrow.id} key={arrow.id}>
            {arrow.arrow === "ArrowLeft" ? "←" : "→"}
          </div>
        );
      })}
      <div>
        <p>current input : {currentUserInput === "ArrowLeft" ? "←" : "→"}</p>
        <p>score : {score}</p>
        <p>combo : {combo}</p>
        <p>max score : {maxScore}</p>
        <p>max combo : {maxCombo}</p>
      </div>
    </div>
  );
}

export default App;

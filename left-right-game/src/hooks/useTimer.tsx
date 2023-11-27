import { useRef, useState } from "react";

const GAME_TIME = 10000;

export default function useTimer() {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timeText, setTimeText] = useState("");
  //   const [time, setTime] = useState(GAME_TIME);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  let currentTime = useRef(0);

  const updateTimerText = (time: number) => {
    const ms = time % 1000;
    const second = (time - ms) / 1000;
    setTimeText(`${second}.${ms}s`);
  };

  const setCurrentTime = (time: number) => {
    currentTime.current = time;
  };

  const handleTimer = (time: number) => {
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      currentTime.current = time - (Date.now() - startTime);
      if (currentTime.current <= 0) {
        endTimer();
        updateTimerText(0);
        return;
      }
      updateTimerText(currentTime.current);
      setCurrentTime(currentTime.current);
    }, 1);
  };

  const initTimer = () => {
    updateTimerText(GAME_TIME);
  };

  const startTimer = () => {
    setIsTimerStart(true);
    handleTimer(GAME_TIME);
  };

  const endTimer = () => {
    setIsTimerStart(false);
    clearInterval(timerRef.current!);
  };

  const addTime = () => {
    clearInterval(timerRef.current!);
    setCurrentTime(currentTime.current + 300);
    handleTimer(currentTime.current);
  };

  const minusTime = () => {
    clearInterval(timerRef.current!);
    setCurrentTime(currentTime.current - 800);
    handleTimer(currentTime.current);
  };
  return {
    isTimerStart,
    timeText,
    startTimer,
    endTimer,
    addTime,
    minusTime,
    initTimer,
  };
}

// 타이머 시간 추가 / 감소 관련 레퍼런스
// https://stackoverflow.com/questions/75900875/how-to-update-value-in-setinterval-function

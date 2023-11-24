import generateRandomArrow from "../utils/generateRandomArrow";
import ArrowBeat from "./arrow-beat";

export default class Game {
  constructor() {}

  generateBeats = () => {
    const array = [];

    for (let i = 0; i < 300; i++) {
      const arrow = generateRandomArrow();

      array.push(new ArrowBeat(arrow, i));
    }

    return array;
  };
}

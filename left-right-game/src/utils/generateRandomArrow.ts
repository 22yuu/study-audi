const arrows = ["ArrowLeft", "ArrowRight"];

export default function generateRandomArrow() {
  return arrows[Math.floor(Math.random() * arrows.length)];
}

export function getNextQuestion(currentIndex: number, totalQuestions: number): number {
  return (currentIndex + 1) % totalQuestions;
}

export function getPreviousQuestion(currentIndex: number, totalQuestions: number): number {
  return currentIndex === 0 ? totalQuestions - 1 : currentIndex - 1;
}

export function getRandomQuestion(totalQuestions: number, lastRandomIndex: number | null): number {
  if (totalQuestions <= 1) return 0;
  
  let newIndex: number;
  do {
    newIndex = Math.floor(Math.random() * totalQuestions);
  } while (newIndex === lastRandomIndex && totalQuestions > 1);
  
  return newIndex;
}

import { useMemo, useState } from "react";
import type { answerType } from "../schema/quiz-schema";

export const useDiagnostic = (answer: answerType[]) => {
  const answerArray = answer;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const isLastAnswer = answer.length - 1 === currentIndex;

  const currentAnswer = useMemo(() => {
    if (currentIndex === answerArray.length)
      return answerArray[answerArray.length - 1];

    return answerArray[currentIndex];
  }, [currentIndex]);

  const handleNextAnswer = () => {
    if (isLastAnswer) return;

    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevAnswer = () => {
    if (currentIndex === 0) return;

    setCurrentIndex((prev) => prev - 1);
  };

  return {
    currentAnswer,
    currentIndex,
    isLastAnswer,
    handleNextAnswer,
    setCurrentIndex,
    handlePrevAnswer,
  };
};

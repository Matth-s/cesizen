import { IQuizUserResponse } from '../schemas/quiz-schema';
import { IQuizWithAnswer } from '../types/quiz-type';

export const calcResultDiag = ({
  userResponse,
  answers,
}: {
  userResponse: IQuizUserResponse['answers'];
  answers: IQuizWithAnswer['answer'];
}): number => {
  const answerMap = new Map(answers.map((a) => [a.id, a.value]));

  return userResponse.reduce((total, ans) => {
    if (!ans.value) return total;

    const value = answerMap.get(ans.id);
    return value ? total + value : total;
  }, 0);
};

import { Type, Static } from '@sinclair/typebox';

export const getQuizResultSchema = {
  body: Type.Object({
    answers: Type.Array(
      Type.Object({
        id: Type.String(),
        value: Type.Boolean(),
      }),
    ),
  }),
  params: Type.Object({
    quizId: Type.String(),
  }),
};

export const updateDiagnosticWithAnswerSchema = {
  body: Type.Object({
    id: Type.String(),
    title: Type.String({
      minLength: 1,
    }),
    createdAt: Type.String(),
    answer: Type.Array(
      Type.Object({
        id: Type.String(),
        name: Type.String({
          minLength: 1,
        }),
        value: Type.Number({
          minimum: 1,
        }),
        quizId: Type.String(),
      }),
    ),
  }),

  params: Type.Object({
    quizId: Type.String(),
  }),
};

export const quizIdParams = {
  params: Type.Object({
    quizId: Type.String(),
  }),
};

export type IQuizUserResponse = Static<
  typeof getQuizResultSchema.body
>;

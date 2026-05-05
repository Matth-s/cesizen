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

export type IQuizUserResponse = Static<
  typeof getQuizResultSchema.body
>;

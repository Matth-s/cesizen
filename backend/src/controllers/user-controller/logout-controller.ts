import type { FastifyReply, FastifyRequest } from 'fastify';

export const logoutController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  reply.clearCookie('accessToken', {
    path: '/',
  });

  reply.clearCookie('refreshToken', {
    path: '/',
  });

  reply.clearCookie('_csrf', {
    path: '/',
  });

  return reply.status(200).send({
    message: 'Déconnexion réussie',
  });
};

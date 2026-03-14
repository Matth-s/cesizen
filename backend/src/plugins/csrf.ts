import fp from 'fastify-plugin';
import csrf from '@fastify/csrf-protection';

export default fp(async (fastify) => {
  await fastify.register(csrf, {
    cookieOpts: {
      signed: false,
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      path: '/',
    },
  });
});

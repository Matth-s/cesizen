import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export default fp(async (fastify) => {
  await fastify.register(jwt, {
    secret: process.env.JWT_ACCESS_SECRET!,
    cookie: {
      cookieName: 'accessToken',
      signed: false,
    },
    namespace: 'accessJwt',
    jwtSign: 'accessJwtSign',
    jwtVerify: 'accessJwtVerify',
  });

  await fastify.register(jwt, {
    secret: process.env.JWT_REFRESH_SECRET!,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    namespace: 'refreshJwt',
    jwtSign: 'refreshJwtSign',
    jwtVerify: 'refreshJwtVerify',
  });
});

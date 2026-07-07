import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export default fp(async (fastify) => {
  await fastify.register(jwt, {
    secret: {
      private: process.env.JWT_ACCESS_PRIVATE!.replace(/\\n/g, '\n'),
      public: process.env.JWT_ACCESS_PUBLIC!.replace(/\\n/g, '\n'),
    },
    sign: {
      algorithm: 'RS256',
    },
    cookie: {
      cookieName: 'accessToken',
      signed: false,
    },
    namespace: 'accessJwt',
    jwtSign: 'accessJwtSign',
    jwtVerify: 'accessJwtVerify',
  });

  await fastify.register(jwt, {
    secret: {
      private: process.env.JWT_REFRESH_PRIVATE!.replace(/\\n/g, '\n'),
      public: process.env.JWT_REFRESH_PUBLIC!.replace(/\\n/g, '\n'),
    },
    sign: {
      algorithm: 'RS256',
    },
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    namespace: 'refreshJwt',
    jwtSign: 'refreshJwtSign',
    jwtVerify: 'refreshJwtVerify',
  });
});

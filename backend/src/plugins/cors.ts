import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (fastify) => {
  await fastify.register(cors, {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
  });
});

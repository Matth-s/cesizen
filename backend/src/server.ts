import Fastify from 'fastify';
import app from './app';

const server = Fastify({
  logger:
    process.env.NODE_ENV === 'production'
      ? true
      : {
          transport: {
            target: 'pino-pretty',
          },
        },
});

server.register(app);

server.listen({
  port: 3000,
  host: '0.0.0.0',
});

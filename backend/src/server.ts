import Fastify from 'fastify';
import app from './app';

const server = Fastify({
  logger: {
    level: 'info',
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
          }
        : undefined,
  },
});

server.register(app);

server.listen({
  port: 3000,
  host: '0.0.0.0',
});

import Fastify from 'fastify';
import app from './app';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino/file',
    options: {
      destination: '/logs/app.log',
      mkdir: true,
    },
  },
});

const server = Fastify({
  logger,
});

server.register(app);

server.listen({
  port: 3000,
  host: '0.0.0.0',
});

import Fastify from 'fastify';
import app from './app';

const server = Fastify({
  logger: true,
});
server.register(app);

server.listen({
  port: 3000,
  host: '0.0.0.0',
});

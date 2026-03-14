import '@fastify/jwt';
import { Role } from '../generated/prisma/enums';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      userId: string;
      role: Role;
    };
    user: {
      userId: string;
      role: Role;
    };
  }
}

import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    accessJwtVerify(): Promise<void>;
    refreshJwtVerify(): Promise<void>;
  }

  interface FastifyReply {
    accessJwtSign(
      payload: Record<string, unknown>,
      options?: Record<string, unknown>,
    ): Promise<string>;

    refreshJwtSign(
      payload: Record<string, unknown>,
      options?: Record<string, unknown>,
    ): Promise<string>;
  }
}

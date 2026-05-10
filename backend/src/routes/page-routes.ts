import { FastifyPluginAsync } from 'fastify';
import { Role } from '../generated/prisma/enums';
import { createPageController } from '../controllers/page/create-page-controller';
import { getAllPagesController } from '../controllers/page/get-all-pages-controller';
import { getPublishedPagesController } from '../controllers/page/get-published-pages-controller';
import { updatePageController } from '../controllers/page/update-page-controller';
import { deletePageController } from '../controllers/page/delete-page-controller';
import {
  createPageSchema,
  updatePageSchema,
  pageIdParams,
} from '../schemas/page-schema';
import { getPageByIdController } from '../controllers/page/get-page-by-id-controller';

export const pageRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/published/:id',
    { schema: pageIdParams },
    getPublishedPagesController,
  );

  fastify.get(
    '/by-id/:id',
    { schema: pageIdParams },
    getPageByIdController,
  );

  fastify.get(
    '/',
    {
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    getAllPagesController,
  );

  fastify.post(
    '/',
    {
      schema: createPageSchema,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    createPageController,
  );

  fastify.put(
    '/:id',
    {
      schema: updatePageSchema,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    updatePageController,
  );

  fastify.delete(
    '/:id',
    {
      schema: pageIdParams,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    deletePageController,
  );
};

import { FastifyPluginAsync } from 'fastify';
import { Role } from '../generated/prisma/enums';
import { createPageController } from '../controllers/page/create-page-controller';
import { getAllPagesController } from '../controllers/page/get-all-pages-controller';
import { getPublishedPagesController } from '../controllers/page/get-published-pages-controller';
import { getPageBySlugController } from '../controllers/page/get-page-by-slug-controller';
import { updatePageController } from '../controllers/page/update-page-controller';
import { deletePageController } from '../controllers/page/delete-page-controller';
import {
  createPageSchema,
  updatePageSchema,
  pageIdParams,
  pageSlugParams,
} from '../schemas/page-schema';

export const pageRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/published', getPublishedPagesController);
  fastify.get(
    '/:slug',
    { schema: pageSlugParams },
    getPageBySlugController,
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

import { FastifyPluginAsync } from 'fastify';
import { Role } from '@prisma/client';
import { createMenuItemController } from '../controllers/menu/create-menu-item-controller';
import { getAllMenuItemsController } from '../controllers/menu/get-all-menu-items-controller';
import { updateMenuItemController } from '../controllers/menu/update-menu-item-controller';
import { deleteMenuItemController } from '../controllers/menu/delete-menu-item-controller';
import {
  createMenuItemSchema,
  updateMenuItemSchema,
  menuItemIdParams,
} from '../schemas/menu-schema';
import { getAllMenuItemController } from '../controllers/menu/get-all-menu-item-controller';

export const menuRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', getAllMenuItemsController);

  fastify.get(
    '/all',
    {
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    getAllMenuItemController,
  );

  // Admin routes
  fastify.post(
    '/',
    {
      schema: createMenuItemSchema,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    createMenuItemController,
  );

  fastify.put(
    '/:id',
    {
      schema: updateMenuItemSchema,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    updateMenuItemController,
  );

  fastify.delete(
    '/:id',
    {
      schema: menuItemIdParams,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    deleteMenuItemController,
  );
};

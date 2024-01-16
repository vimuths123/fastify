import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/userController';
import { auth0Middleware  } from '../middleware/auth0Middleware';

export default async function (fastify: FastifyInstance) {

    fastify.addHook('preHandler', auth0Middleware);
    
    fastify.post('/user/:id', userController.getUser);
}

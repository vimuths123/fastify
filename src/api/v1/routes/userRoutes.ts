import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/userController';

export default async function (fastify: FastifyInstance) {
    fastify.addHook('preHandler', async (request, reply) => {
        console.log('This is a preHandler hook at the plugin level.');
    });

    fastify.get('/user/:id', userController.getUser);
}

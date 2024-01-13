import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/userController';

export default async function (fastify: FastifyInstance) {
    fastify.get('/user/:id', userController.getUser);
}

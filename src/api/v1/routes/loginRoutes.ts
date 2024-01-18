import { FastifyInstance } from 'fastify';
import * as loginController from '../controllers/loginController';

export default async function (fastify: FastifyInstance) {
    fastify.post('/sendotp', loginController.sendOtp);
    fastify.post('/gettoken', loginController.getToken);
}

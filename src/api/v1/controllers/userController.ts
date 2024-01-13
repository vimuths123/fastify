// userController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserService } from '../services/userService'; // Adjust the path based on your project structure

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Call the service function to get user data
    const user = await getUserService();
    

    // Sending a response
    reply.send(user);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching user:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

// userController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';

interface SendOtpRequest {
  Body: {
    email: string;
  };
}

export const sendOtp = async (request: FastifyRequest<SendOtpRequest>, reply: FastifyReply) => {
  const auth0Domain = process.env.AUTH0_DOMAIN; 
  const clientId = process.env.AUTH0_CLIENT_ID; 
  const clientSecret = process.env.AUTH0_CLIENT_SECRET; 
  const userEmail = request.body.email;

  
  try {
    const response = await axios.post(`${auth0Domain}/passwordless/start`, {
      client_id: clientId,
      client_secret: clientSecret,
      connection: 'email',
      email: userEmail,
      send: 'code'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    reply.send(response.data);
  } catch (error) {
    console.error('Error sending OTP:', error);
    reply.code(500).send({ error: 'Error sending OTP' });
  }
};
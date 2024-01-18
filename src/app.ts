import Fastify from 'fastify';
import userRoutes from './api/v1/routes/userRoutes';
import { auth0Middleware } from './api/v1/middleware/auth0Middleware';
import loginRoutes from './api/v1/routes/loginRoutes';
import cors from '@fastify/cors';

const app = Fastify();

app.register(cors);

// Register routes
app.register(userRoutes);
app.register(loginRoutes);

// app.addHook('preHandler', auth0Middleware);

app.get('/', async (request, reply) => {
  return { message: 'This is the Unisyn Node API' };
});


export default app;

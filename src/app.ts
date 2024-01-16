import Fastify from 'fastify';
import userRoutes from './api/v1/routes/userRoutes';
import { auth0Middleware } from './api/v1/middleware/auth0Middleware';

const app = Fastify();

// Register routes
app.register(userRoutes);

// app.addHook('preHandler', auth0Middleware);

app.get('/', async (request, reply) => {
  return { message: 'This is the Unisyn Node API' };
});


export default app;

import Fastify from 'fastify';
import userRoutes from './api/v1/routes/userRoutes';

const app = Fastify();

// Register routes
app.register(userRoutes);

app.get('/', async (request, reply) => {
  return { message: 'This is the Unisyn Node API' };
});


export default app;

import app from './app';

export const handler = (req: any, res: any) => {
  app.ready(err => {
    if (err) throw err;
    app.server.emit('request', req, res);
  });
};

const start = async () => {
  try {
    await app.listen({ port: 8080 });
    console.log(`Server listening on port 8080`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
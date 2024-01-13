"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)();
app.get('/', async (request, reply) => {
    return { hello: 'world' };
});
const handler = (req, res) => {
    app.ready(err => {
        if (err)
            throw err;
        app.server.emit('request', req, res);
    });
};
exports.handler = handler;
const start = async () => {
    try {
        await app.listen({ port: 8080 });
        console.log(`Server listening on port 8080`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();

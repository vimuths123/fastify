"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const userRoutes_1 = __importDefault(require("./api/v1/routes/userRoutes"));
const app = (0, fastify_1.default)();
// Register routes
app.register(userRoutes_1.default);
app.get('/', async (request, reply) => {
    return { message: 'This is the Unisyn Node API' };
});
exports.default = app;

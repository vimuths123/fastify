"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myPreHandlerPlugin = async (fastify, options) => {
    console.log('Plugin registered');
    fastify.addHook('preHandler', async (request, reply) => {
        console.log('here in preHandler');
    });
};
exports.default = myPreHandlerPlugin;

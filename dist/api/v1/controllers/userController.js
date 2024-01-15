"use strict";
// userController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const userService_1 = require("../services/userService"); // Adjust the path based on your project structure
const getUser = async (request, reply) => {
    try {
        // Call the service function to get user data
        const user = await (0, userService_1.getUserService)();
        // Sending a response
        reply.send(user);
    }
    catch (error) {
        // Handle errors appropriately
        console.error('Error fetching user:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};
exports.getUser = getUser;

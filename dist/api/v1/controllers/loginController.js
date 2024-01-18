"use strict";
// userController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const axios_1 = __importDefault(require("axios"));
const sendOtp = async (request, reply) => {
    const auth0Domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;
    const userEmail = request.body.email;
    try {
        const response = await axios_1.default.post(`${auth0Domain}/passwordless/start`, {
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
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        reply.code(500).send({ error: 'Error sending OTP' });
    }
};
exports.sendOtp = sendOtp;

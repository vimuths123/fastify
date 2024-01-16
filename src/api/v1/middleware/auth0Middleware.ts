// src/middleware/myPreHandlerPlugin.ts
import { FastifyRequest, FastifyReply } from 'fastify';
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const dotenv = require('dotenv');

dotenv.config();

const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
};

interface MyUserType {
    // ... define the properties of your user object here
}

// Extend the FastifyRequest interface
declare module 'fastify' {
    interface FastifyRequest {
        user?: MyUserType;
    }
}

export async function auth0Middleware(request: FastifyRequest, reply: FastifyReply) {
    if (!request.headers.authorization) {
        reply.code(401).send({ error: 'Authorization header is missing' });
        return;
    }

    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
        reply.code(401).send({ error: 'No token provided' });
        return;
    }

    const options = {
        audience: authConfig.audience,
        issuer: `https://${authConfig.domain}/`,
        algorithms: ['RS256'],
    };



    jwt.verify(token, getKey, options, (err: any, decoded: any) => {
        if (err) {
            console.error('Error verifying token:', err);
            console.log('Decoded token:', decoded);
            reply.code(401).send({ error: 'Invalid token' });
            return;
        }

        request.user = decoded;
    });

}

const client = jwksRsa({
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
});

const getKey = (header: any, callback: any) => {
    client.getSigningKey(header.kid, (err: any, key: any) => {
        if (err) {
            console.error('Error fetching JWKS:', err);
            return callback(err);
        }
        // Get the signing key
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};

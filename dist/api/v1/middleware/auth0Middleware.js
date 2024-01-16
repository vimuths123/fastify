"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0Middleware = void 0;
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const dotenv = require('dotenv');
dotenv.config();
const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
};
async function auth0Middleware(request, reply) {
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
    jwt.verify(token, getKey, options, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            console.log('Decoded token:', decoded);
            reply.code(401).send({ error: 'Invalid token' });
            return;
        }
        request.user = decoded;
    });
}
exports.auth0Middleware = auth0Middleware;
const client = jwksRsa({
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
});
const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            console.error('Error fetching JWKS:', err);
            return callback(err);
        }
        // Get the signing key
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};

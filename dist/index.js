"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const app_1 = __importDefault(require("./app"));
const handler = (req, res) => {
    app_1.default.ready(err => {
        if (err)
            throw err;
        app_1.default.server.emit('request', req, res);
    });
};
exports.handler = handler;
const start = async () => {
    try {
        await app_1.default.listen({ port: 8080 });
        console.log(`Server listening on port 8080`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = {
    prot: 3000,
    jwt: {
        secret: 'backSystem',
        path: [/^\/unToken/],
        expiresIn: '500s'
    },
    mogodb: {
        uri: 'mongodb://47.96.254.45:27017/ygwDB',
        user: 'ygw',
        pass: 'ygw321'
    }
};

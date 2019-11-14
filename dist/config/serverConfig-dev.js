"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = {
    prot: 3000,
    jwt: {
        secret: 'koa-demo',
        path: [/^\/user\/login/],
        expiresIn: '2h'
    },
    mogodb: {
        uri: 'mongodb://47.96.254.45:27017/ygwDB',
        user: 'ygw',
        pass: 'ygw321'
    }
};

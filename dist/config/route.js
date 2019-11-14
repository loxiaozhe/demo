"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("../controller");
var middleware_1 = require("../middleware");
exports.routes = [
    {
        path: '/user/findOne',
        method: 'GET',
        middleware: middleware_1.IndexMiddleware.userTokenMiddleware,
        fn: controller_1.controller.user.findUser
    },
    {
        path: '/user/create',
        method: 'POST',
        middleware: middleware_1.IndexMiddleware.nullMiddleware,
        fn: controller_1.controller.user.createUser
    },
    {
        path: '/user/login',
        method: 'POST',
        middleware: middleware_1.IndexMiddleware.nullMiddleware,
        fn: controller_1.controller.user.login
    }
];

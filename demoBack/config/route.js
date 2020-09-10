"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("../controller");
var middleware_1 = require("../middleware");
exports.routes = [
    {
        root: '/unToken',
        routeList: [
            {
                path: '/login',
                methods: 'POST',
                middleware: middleware_1.IndexMiddleware.nullMiddleware,
                fn: controller_1.controller.user.login
            },
            {
                path: '/getCode',
                methods: 'GET',
                middleware: middleware_1.IndexMiddleware.nullMiddleware,
                fn: controller_1.controller.user.getCode
            },
            {
                path: '/findMobile',
                methods: 'GET',
                middleware: middleware_1.IndexMiddleware.nullMiddleware,
                fn: controller_1.controller.unToken.findByMobile
            }
        ]
    },
    {
        root: '/user',
        routeList: [
            {
                path: '/logout',
                methods: 'POST',
                middleware: middleware_1.IndexMiddleware.userTokenMiddleware,
                fn: controller_1.controller.user.logout
            },
            {
                path: '/modifyPassword',
                methods: 'POST',
                middleware: middleware_1.IndexMiddleware.userTokenMiddleware,
                fn: controller_1.controller.user.modifyPassword
            },
            {
                path: '/bindMail',
                methods: 'POST',
                middleware: middleware_1.IndexMiddleware.userTokenMiddleware,
                fn: controller_1.controller.user.modifyMail
            },
            {
                path: '/modifyMail',
                methods: 'POST',
                middleware: middleware_1.IndexMiddleware.userTokenMiddleware,
                fn: controller_1.controller.user.modifyMail
            },
            {
                path: '/bindWarning',
                methods: 'POST',
                middleware: middleware_1.IndexMiddleware.userTokenMiddleware,
                fn: controller_1.controller.user.bindWarning
            },
            {
                path: '/findByMobile',
                methods: 'GET',
                middleware: middleware_1.IndexMiddleware.userTokenMiddleware,
                fn: controller_1.controller.user.findByMobile
            },
            {
                path: '/create',
                methods: 'POST',
                middleware: middleware_1.IndexMiddleware.nullMiddleware,
                fn: controller_1.controller.user.createUser
            }
        ]
    },
    {
        root: '/statistics',
        routeList: [
            {
                path: '/getData',
                methods: 'GET',
                middleware: middleware_1.IndexMiddleware.nullMiddleware,
                fn: controller_1.controller.statistics.getData
            },
            {
                path: '/getWeekData',
                methods: 'GET',
                middleware: middleware_1.IndexMiddleware.nullMiddleware,
                fn: controller_1.controller.statistics.getWeekData
            },
            {
                path: '/findMobile',
                methods: 'GET',
                middleware: middleware_1.IndexMiddleware.nullMiddleware,
                fn: controller_1.controller.unToken.findByMobile
            }
        ]
    }
];

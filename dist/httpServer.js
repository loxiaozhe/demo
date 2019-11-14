"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var Router = require("koa-router");
var Jwt = require("koa-jwt");
var bodyparser = require("koa-bodyparser");
var serverConfig_dev_1 = require("./config/serverConfig-dev");
var route_1 = require("./config/route");
var middleware_1 = require("./middleware");
var mongoDB_1 = require("./mongoDB");
var HttpServer = (function () {
    function HttpServer() {
    }
    HttpServer.creatServer = function () {
        var app = new Koa();
        var route = new Router();
        route_1.routes.forEach(function (item) {
            if (item.method === 'GET') {
                route.get(item.path, item.middleware, item.fn);
            }
            if (item.method === 'POST') {
                route.post(item.path, item.middleware, item.fn);
            }
        });
        app.use(bodyparser())
            .use(middleware_1.IndexMiddleware.errorMiddleware)
            .use(Jwt({ secret: serverConfig_dev_1.serverConfig.jwt.secret }).unless({ path: serverConfig_dev_1.serverConfig.jwt.path }))
            .use(route.routes())
            .use(route.allowedMethods());
        mongoDB_1.DB.connect();
        app.listen(serverConfig_dev_1.serverConfig.prot, '0.0.0.0');
        console.log("\u670D\u52A1\u5DF2\u542F\u52A8" + serverConfig_dev_1.serverConfig.prot);
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;

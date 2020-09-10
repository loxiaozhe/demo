"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var Router = require("koa-router");
var session = require("koa-session");
var Jwt = require("koa-jwt");
var bodyparser = require("koa-bodyparser");
var Logger = require("koa-logger");
var Moment = require("moment");
var serverConfig_dev_1 = require("./config/serverConfig-dev");
var route_1 = require("./config/route");
var middleware_1 = require("./middleware");
var mongoDB_1 = require("./mongoDB");
var HttpServer = (function () {
    function HttpServer() {
    }
    HttpServer.creatServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app, route, logger, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = new Koa();
                        route = new Router();
                        logger = Logger(function (str) {
                            console.log(Moment().format() + ('YYYY-MM-DD HH:MM:SS') + str);
                        });
                        route_1.routes.forEach(function (item) {
                            item.routeList.forEach(function (routeNode) {
                                var methods = routeNode.methods.split(',');
                                methods.forEach(function (method) {
                                    if (method.toUpperCase() === 'GET') {
                                        route.get(item.root + routeNode.path, routeNode.middleware, routeNode.fn);
                                    }
                                    if (method.toUpperCase() === 'POST') {
                                        route.post(item.root + routeNode.path, routeNode.middleware, routeNode.fn);
                                    }
                                });
                            });
                        });
                        app.keys = ['this is my demo'];
                        config = {
                            key: 'koa:sess',
                            maxAge: 60 * 1000 * 20,
                            overwrite: true,
                            httpOnly: true,
                            signed: true,
                            rolling: true,
                            renew: true
                        };
                        app.use(logger)
                            .use(session(config, app))
                            .use(bodyparser())
                            .use(middleware_1.IndexMiddleware.errorMiddleware)
                            .use(Jwt({ secret: serverConfig_dev_1.serverConfig.jwt.secret }).unless({ path: serverConfig_dev_1.serverConfig.jwt.path }))
                            .use(route.routes())
                            .use(route.allowedMethods());
                        return [4, mongoDB_1.DB.connect()];
                    case 1:
                        _a.sent();
                        app.listen(serverConfig_dev_1.serverConfig.prot, '0.0.0.0');
                        console.log("\u670D\u52A1\u5DF2\u542F\u52A8" + serverConfig_dev_1.serverConfig.prot);
                        return [2];
                }
            });
        });
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;

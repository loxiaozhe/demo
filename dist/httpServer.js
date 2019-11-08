"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：HttpServer类，创建web服务
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
const Koa = require("koa");
const Router = require("koa-router");
const serverConfig_dev_1 = require("./config/serverConfig-dev");
const route_1 = require("./config/route");
class HttpServer {
    static creatServer() {
        const app = new Koa();
        const route = new Router();
        route_1.routes.forEach((item) => {
            if (item.method === 'GET') {
                route.get(item.path, item.fn);
            }
            if (item.method === 'POST') {
                route.post(item.path, item.fn);
            }
        });
        app.use(route.routes());
        app.use(route.allowedMethods());
        app.listen(serverConfig_dev_1.serverConfig.prot, '0.0.0.0');
        console.log(`服务已启动${serverConfig_dev_1.serverConfig.prot}`);
    }
}
exports.HttpServer = HttpServer;

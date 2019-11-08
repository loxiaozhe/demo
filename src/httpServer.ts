/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：HttpServer类，创建web服务
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import * as Koa from 'koa';
import * as Session from 'koa-session';
import * as Router from 'koa-router';
import { serverConfig } from './config/serverConfig-dev';
import { routes } from './config/route';
import { IndexMiddleware } from './middleware';
export class HttpServer {
    /**
     * @summary 创建web服务
     */
    static creatServer(): void {
        const app = new Koa();
        const route = new Router();
        const CONFIG = {
            key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
            /** (number || 'session') maxAge in ms (default is 1 days) */
            /** 'session' will result in a cookie that expires when session/browser is closed */
            /** Warning: If a session cookie is stolen, this cookie will never expire */
            maxAge: 86400000,
            overwrite: true /** (boolean) can overwrite or not (default true) */,
            httpOnly: true /** (boolean) httpOnly or not (default true) */,
            signed: true /** (boolean) signed or not (default true) */,
            rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
            renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
        };
        routes.forEach((item) => {
            if (item.method === 'GET') {
                route.get(item.path, item.middleware, item.fn);
            }
            if (item.method === 'POST') {
                route.post(item.path, item.middleware, item.fn);
            }
        });
        app.use(IndexMiddleware.errorMiddleware)
            .use(Session(CONFIG, app))
            .use(route.routes())
            .use(route.allowedMethods());
        app.listen(serverConfig.prot, '0.0.0.0');
        console.log(`服务已启动${serverConfig.prot}`);
    }
}

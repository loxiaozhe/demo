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
import * as Router from 'koa-router';
import * as Jwt from 'koa-jwt';
import * as bodyparser from 'koa-bodyparser';
import { serverConfig } from './config/serverConfig-dev';
import { routes } from './config/route';
import { IndexMiddleware } from './middleware';
import { DB } from './mongoDB';
export class HttpServer {
    /**
     * @summary 创建web服务
     */
    static creatServer() {
        const app = new Koa();
        const route = new Router();
        //注册路由
        routes.forEach((item) => {
            if (item.method === 'GET') {
                route.get(item.path, item.middleware, item.fn);
            }
            if (item.method === 'POST') {
                route.post(item.path, item.middleware, item.fn);
            }
        });
        //加载中间件
        app.use(bodyparser())
            .use(IndexMiddleware.errorMiddleware)
            .use(Jwt({ secret: serverConfig.jwt.secret }).unless({ path: serverConfig.jwt.path }))
            .use(route.routes())
            .use(route.allowedMethods());
        //连接数据库
        DB.connect();
        //启动端口服务
        app.listen(serverConfig.prot, '0.0.0.0');
        console.log(`服务已启动${serverConfig.prot}`);
    }
}

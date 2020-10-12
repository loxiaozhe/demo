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
import * as session from 'koa-session';
import * as Jwt from 'koa-jwt';
import * as bodyparser from 'koa-bodyparser';
import * as Logger from 'koa-logger';
import * as Moment from 'moment';
import { serverConfig } from './config/serverConfig-dev';
import { routes } from './config/route';
import { IndexMiddleware } from './middleware';
import { DB } from './mongoDB';
export class HttpServer {
    /**
     * @summary 创建web服务
     */
    static async creatServer() {
        const app = new Koa();
        const route = new Router();
        const logger = Logger((str) => {
            console.log(Moment().format('YYYY-MM-DD HH:MM:SS') + str);
        });
        //注册路由
        routes.forEach((item) => {
            item.routeList.forEach((routeNode) => {
                const methods = routeNode.methods.split(',');
                methods.forEach((method) => {
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
        const config = {
            key: 'koa:sess',
            maxAge: 60 * 1000 * 20,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: true, //每次访问将会重置过期时间
            renew: true
        };
        //加载中间件
        app.use(logger) //日志中间件
            .use(session(config, app)) //session中间件
            .use(bodyparser()) //body解析中间件
            .use(IndexMiddleware.errorMiddleware) //error信息处理中间件
            //JWT设置passthrough: true(允许无效的的token信息)
            // .use(Jwt({ secret: serverConfig.jwt.secret, passthrough: true }).unless({ path: serverConfig.jwt.path }))
            .use(Jwt({ secret: serverConfig.jwt.secret }).unless({ path: serverConfig.jwt.path })) //对需要限制的资源请求进行检查
            .use(route.routes()) //路由中间件
            .use(route.allowedMethods());
        //连接数据库
        await DB.connect();
        //启动端口服务
        app.listen(serverConfig.prot, '0.0.0.0');
        console.log(`服务已启动${serverConfig.prot}`);
    }
}

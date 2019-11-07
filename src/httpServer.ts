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
import { serverConfig } from './config/serverConfig-dev';
import { routes } from './config/route';
export class HttpServer {
    static creatServer(): void {
        const app = new Koa();
        const route = new Router();
        routes.forEach((item) => {
            if (item.method === 'GET') {
                route.get(item.path, item.fn);
            }
            if (item.method === 'POST') {
                route.post(item.path, item.fn);
            }
        });
        app.use(route.routes());
        app.use(route.allowedMethods());
        app.listen(serverConfig.prot, '0.0.0.0');
        console.log(`服务已启动${serverConfig.prot}`);
    }
}

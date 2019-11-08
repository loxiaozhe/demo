/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：IndexMiddleware所有中间件的验证
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { Context } from 'koa';
export class IndexMiddleware {
    static async errorMiddleware(ctx: Context, next: () => Promise<any>) {
        try {
            await next();
        } catch (err) {
            ctx.body = { err: err.message, code: 403 };
        }
    }

    static async sessionMiddleware(ctx: Context, next: () => Promise<any>) {
        if (ctx.session.user) {
            await next();
        } else {
            throw new Error('未登录');
        }
    }
}

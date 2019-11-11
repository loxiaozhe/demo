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
import { Util } from '../util';

export class IndexMiddleware {
    /**
     * **错误处理中间件**
     * @param {Context} ctx 上下文
     * @param {Function} next
     * @returns {Promise<void>}
     */
    static async errorMiddleware(ctx: Context, next: () => Promise<any>): Promise<void> {
        try {
            await next();
        } catch (err) {
            console.log(err);
            ctx.body = { err: err.status == 401 ? '登录过期，请重新登录！' : err.message, code: err.status || 403 };
        }
    }
    /**
     * **userToken中间件**
     * @param {Context} ctx 上下文
     * @param {Function} next
     * @returns {Promise<void>}
     */
    static async userTokenMiddleware(ctx: Context, next: () => Promise<any>): Promise<void> {
        if (ctx.header && ctx.header.authorization) {
            const token = ctx.header.authorization;
            const user = Util.parseToken(token);
            console.log(user);
            ctx.user = user;
            await next();
        } else {
            throw new Error('未登录');
        }
    }
    /**
     * **null中间件**
     * @param {Context} ctx 上下文
     * @param {Function} next
     * @returns {Promise<void>}
     */
    static async nullMiddleware(ctx: Context, next: () => Promise<any>): Promise<void> {
        await next();
    }
}

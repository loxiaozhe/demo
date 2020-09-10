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
import { utils } from '../util';
import { model } from '../model';

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
            console.error(err);
            if (err.name === 'ValidationError') {
                //err.name === 'ValidationError',数据库字段验证失败
                err.message = [];
                for (let item of Object.keys(err.errors)) {
                    err.message.push(err.errors[item].message);
                }
                ctx.throw(err.message, 400);
            } else if (err.name === 'UnauthorizedError') {
                //err.name==='UnauthorizedError',token验证失败
                ctx.throw('登录过期，请重新登录！', 401);
            } else {
                ctx.throw(err.message, 400);
            }
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
            //如果JWT设置passthrough: true(允许无效的的token信息)，这里解析token需要进行try catch
            // try {
            const user = utils.parseToken(token);
            ctx.user = user;
            // } catch (error) {
            //     throw new Error('登录超时，请重新登录！');
            // }
        } else {
            throw new Error('请确认是否未登录系统');
        }
        const { userNmae } = ctx.request.body || ctx.request.query;
        if (userNmae) {
            try {
                const user = model.user.findOne({ userNmae: userNmae });
                if (!user) {
                    throw new Error('该用户不存在');
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        await next();
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

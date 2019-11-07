/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User类，处理用户逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { Context } from 'koa';
export class User {
    findUser(ctx: Context): void {
        ctx.body = { name: '张三', age: 10 };
    }

    createUser(ctx: Context): void {
        ctx.body = { name: '张三', age: 10, success: true };
    }
}

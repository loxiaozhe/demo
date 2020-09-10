/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：UnTokenController不需要token的功能业务
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { Context } from 'koa';
import { logic } from '../logic';
import { utils } from '../util';
export class UnTokenController {
    /**
     * **用户是否存在**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async findByMobile(ctx: Context): Promise<void> {
        //接收参数
        const { mobile } = ctx.request.body;
        //校验参数
        if (utils.isMobile(mobile)) {
            let user;
            try {
                user = await logic.user.findByMobile(mobile, ['mobile']);
            } catch (error) {
                console.error(error);
                throw new Error('数据操作异常');
            }
            if (user) {
                throw new Error('手机号已存在');
            }
            ctx.body = { message: '手机号可以使用', code: 200 };
        } else {
            throw new Error('手机号格式不正确');
        }
    }
}

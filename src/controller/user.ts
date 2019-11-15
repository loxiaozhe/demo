import { Context } from 'koa';
import { utils } from '../util';
import { logic } from '../logic';
export class UserController {
    /**
     * **查询**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async findByMobile(ctx: Context): Promise<void> {
        ctx.body = await logic.user.findByMobile(ctx.request.body.mobile);
    }
    /**
     * **注册**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async createUser(ctx: Context): Promise<void> {
        const { name, pass, mobile } = ctx.request.body;
        ctx.body = await logic.user.createUser({ name, pass, mobile });
    }
    /**
     * **登录**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async login(ctx: Context): Promise<void> {
        const { mobile, pass } = ctx.request.body;
        if (!utils.isMobile(mobile)) {
            throw new Error('手机号格式不正确');
        }
        if (!utils.isPass(pass)) {
            throw new Error('密码格式不正确');
        }
        const user = await logic.user.findByMobile(mobile);
        if (user.get('pass') !== pass) {
            throw new Error('用户名或密码错误');
        }
        ctx.body = await logic.user.login(mobile, pass);
    }
}

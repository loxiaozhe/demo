import { Context } from 'koa';
import { logic } from '../logic';
export class UserController {
    /**
     * **获取用户**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async findUser(ctx: Context): Promise<void> {
        ctx.body = await logic.user.findUserByID(ctx.request.body.name);
    }
    /**
     * **创建用户**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async createUser(ctx: Context): Promise<void> {
        const { name, pass, mobile } = ctx.request.body;
        ctx.body = await logic.user.createUser({ name, pass, mobile });
    }
    /**
     * **用户登录**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async login(ctx: Context): Promise<void> {
        const { name, pass } = ctx.request.body;
        ctx.body = await logic.user.login(name, pass);
    }
}

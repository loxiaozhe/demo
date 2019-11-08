import { Context } from 'koa';
import { logic } from '../logic/index';
export class UserController {
    async findUser(ctx: Context): Promise<any> {
        ctx.body = await logic.user.findUserByID('aaaaa');
    }

    async createUser(ctx: Context): Promise<any> {
        ctx.body = await logic.user.createUser();
    }
}

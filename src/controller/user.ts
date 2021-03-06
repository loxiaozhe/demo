/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：UserController用户功能业务
 *
 * @author yuangw<yuangw@ucap.com.cn>  2020-09
 */
import { Context } from 'koa';
import { utils } from '../util';
import { logic } from '../logic';
import { ChangeStream } from 'mongodb';
export class UserController {
    /**
     * **获取验证码**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async getCode(ctx: Context): Promise<void> {
        const queryObj = ctx.request.query;
        const code = utils.getCode(queryObj.t);
        if (!code) {
            throw new Error('获取验证码出错');
        }
        ctx.session.code = code.text.toLowerCase();
        ctx.set({ type: 'svg' });
        ctx.body = code.data;
    }

    /**
     * **登录**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async login(ctx: Context): Promise<void> {
        const { userName, password, code } = ctx.request.body;
        //校验用户名，密码，验证码
        if (userName && !utils.isUserName(userName)) {
            throw new Error('用户名格式不正确');
        }

        if (password && !utils.isPass(password)) {
            throw new Error('密码格式不正确');
        }

        if (code && ctx.session.code != code.toLowerCase()) {
            throw new Error('验证码不正确');
        }
        let user;
        try {
            user = await logic.user.findByUserName(userName, true);
        } catch (error) {
            throw error;
        }
        if (!user) {
            throw new Error('用户不存在');
        }
        if (user.get('password') && user.get('password') !== password) {
            throw new Error('用户名或密码错误');
        } else {
            ctx.body = await logic.user.login(user);
        }
    }
    /**
     * **登出**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async logout(ctx: Context): Promise<void> {
        const { userName } = ctx.request.body;
        if (!userName) {
            throw new Error('该用户未登陆或登陆超时');
        }
        ctx.body = { msg: '退出成功' };
    }

    /**
     * **修改密码**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async modifyPassword(ctx: Context): Promise<void> {
        const { userName, password, aginPassword } = ctx.request.body;
        if (!userName) {
            throw new Error('该用户未登陆或登陆超时');
        }
        if (!password || !aginPassword) {
            throw new Error('旧密码或新密码不能为空');
        }
        if (!utils.isPass(aginPassword)) {
            throw new Error('新密码格式不正确');
        }
        let dataUser;
        try {
            dataUser = await logic.user.findByUserName(userName, true);
        } catch (error) {
            throw error;
        }
        //判断密码是否一致
        if (dataUser.get('password') === password) {
            try {
                await logic.user.modifyPassword(userName, aginPassword);
                // util.redisModifyPublish('changePassword', { userName: parameter.userName });
                ctx.body = { msg: '修改密码操作成功' };
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error('旧密码错误');
        }
    }
    /**
     * **修改邮箱****绑定邮箱**
     * @param {string} ctx.userName 用户名
     * @param {string} ctx.email 邮箱
     * @param {string} ctx.type 修改类型 'modify'修改；'bind'绑定
     * @returns {Promise<void>}
     */
    async modifyMail(ctx: Context): Promise<void> {
        const { userName, email, type } = ctx.request.body;
        if (!email || !utils.isEmail(email)) {
            throw new Error('邮箱格式不正确');
        }
        if (!type) {
            throw new Error('缺少邮箱修改类型');
        }
        if (!userName) {
            throw new Error('该用户未登陆或登陆超时');
        }
        try {
            await logic.user.modifyMail(userName, email);
            ctx.body = type === 'modify' ? { msg: '邮箱修改成功' } : { msg: '邮箱绑定成功' };
        } catch (error) {
            throw new Error(type === 'modify' ? '邮箱修改失败' : '邮箱绑定失败');
        }
    }
    /**
     * **设置预警**
     * @param {string} ctx.userName 用户名
     * @param {string} ctx.warning 预警类型
     * @returns {Promise<void>}
     */
    async bindWarning(ctx: Context): Promise<void> {
        const { userName, warning } = ctx.request.body;
        if (!warning) {
            throw new Error('预警类型不正确');
        }
        if (!userName) {
            throw new Error('该用户未登陆或登陆超时');
        }
        try {
            await logic.user.modifyUserInfo({ userName: userName }, { $set: { warning: warning } });
            ctx.body = { msg: '预警设置成功' };
        } catch (error) {
            throw error;
        }
    }
    /**
     * **后台用户列表**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async findSystemUser(ctx: Context): Promise<void> {
        let data = {
                sort: ctx.body.sort || { createDate: -1 },
                skip: (ctx.body.page - 1) * ctx.body.rows || 0,
                limit: ctx.body.rows || 10,
                keyWords: ctx.body.keyWords || '',
                isEnable: ctx.body.isEnable || '2',
                startTime: ctx.body.startTime || '',
                endTime: ctx.body.endTime || ''
            },
            query = {};
        if (data.isEnable !== '2') {
            query = utils._.extend({ isEnable: data.isEnable }, query);
        }
        if (!ctx.user && ctx.user.userName != 'ucap_manager') {
            query = { userName: { $nin: ['ucap_manager'] } };
        }
        if (!utils._.isEmpty(data.keyWords)) {
            query = utils._.extend({ $or: [{ userName: new RegExp(data.keyWords) }, { name: new RegExp(data.keyWords) }] }, query);
        }
        if (ctx.body.startTime && ctx.body.endTime) {
            query = utils._.extend(
                { $and: [{ createDate: { $gte: ctx.body.startTime } }, { createDate: { $lte: ctx.body.endTime } }] },
                query
            );
        }
        try {
            ctx.body = await logic.user.findSystemUser(query, data.sort, data.skip, data.limit);
        } catch (error) {
            throw error;
        }
    }
    /**
     * **添加后台用户**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async createUser(ctx: Context): Promise<void> {
        const { userName, passWord, name, permission, email, mobile } = ctx.request.body;
        if (!userName) {
            throw new Error('用户名不能为空');
        }
        if (!passWord) {
            throw new Error('密码不能为空');
        }
        if (!name) {
            throw new Error('姓名不能为空');
        }
        if (!permission || (utils._.isArray(permission) && permission.length == 0)) {
            throw new Error('权限不能为空');
        }
        if (!email) {
            throw new Error('邮箱不能为空');
        }
        if (!mobile) {
            throw new Error('手机号不能为空');
        }
        try {
            const createUser = await logic.user.createSystemUser({ userName, name, passWord, mobile, permission, email });
            console.log('添加用户' + createUser);
            ctx.body = { msg: '用户添加成功' };
        } catch (error) {
            throw error;
        }
    }
}

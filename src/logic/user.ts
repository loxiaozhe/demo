/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：UserLogic处理用户逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { Document } from 'mongoose';
import { model } from '../model';
import { utils } from '../util';

export class UserLogic {
    static fields = ['userName', 'password', 'email', 'userID', 'warning', 'isEnable', 'name', 'mobile', 'permission'];
    // static fields = ['userName', 'password', 'email'];
    /**
     * **查询**
     * @param {string} userName 用户名
     * @param {Array} fields 返回字段
     * @returns {Promise<Document>} 示例：
     * {"_id":"5b50091c30d72c3ee39f7974","userName":"ucapManager",
     * "password":"50e574365268f9ad3ab75f864c384678","email":"wangyq@ucap.com.cn",
     * "userID":"ac0b2cbf32f411aa66678a61a3a494b4","domain":"ucap","warning":"1",
     * "isEnable":true,"name":"系统管理员","mobile":"","permission":[]}}
     */
    async findByUserName(userName: string, flag?: boolean, fields?: [string]): Promise<Document> {
        let user = null;
        try {
            if (Array.isArray(fields) && fields.length > 0) {
                user = await Promise.resolve(model.user.findOne({ userName: userName }, fields));
            } else if (typeof flag === 'boolean' && flag == true) {
                user = await Promise.resolve(model.user.findOne({ userName: userName }, UserLogic.fields));
            } else {
                user = await Promise.resolve(model.user.findOne({ userName: userName }));
            }
        } catch (error) {
            console.error(error);
            throw new Error('查询用户，数据操作异常');
        }

        if (!user.isEnable) {
            throw new Error('账户已停用');
        }
        return user;
    }
    /**
     * **创建后台用户**
     * @param {string} user.pass 密码
     * @param {string} user.mobile 手机号
     * @param {string} user.name 姓名
     * @returns {Promise<Document>} 示例：{"name": "manager", "passWord": "123321","mobile": "18210294511","userName":"ucap","permission":[],"email":"ucap@ucap.com.cn"}
     */
    async createSystemUser(user: any): Promise<Document> {
        try {
            return await model.user.create(user);
        } catch (error) {
            console.error(error);
            throw new Error('添加后台用户，数据操作异常');
        }
    }
    /**
     ***登录**
     * @param {string} user.userName 用户名
     * @param {string} user.password 密码
     * @returns {Promise<{ [name: string]: unknown }>} 示例：
     * {"token":"eyJhbGc****HZ2ETX9VRrPa8",
     * "user":{"_id":"5b50091c30d72c3ee39f7974","userName":"ucapManager",
     * "password":"50e574365268f9ad3ab75f864c384678","email":"wangyq@ucap.com.cn",
     * "userID":"ac0b2cbf32f411aa66678a61a3a494b4","domain":"ucap","warning":"1",
     * "isEnable":true,"name":"系统管理员","mobile":"","permission":[]}}
     */
    async login(user: any): Promise<{ token: string; user: any }> {
        return { token: utils.getToken(user.userName, user.password), user: user };
    }

    /**
     ***修改密码**
     * @param {string} userName 用户名
     * @param {string} aginPassword 新密码
     * @returns {Promise<void>}
     */
    async modifyPassword(userName: string, aginPassword: string): Promise<void> {
        const conditions = { userName: userName },
            doc = { $set: { password: aginPassword } };
        try {
            model.user.updateOne(conditions, doc);
        } catch (error) {
            console.error(error);
            throw new Error('修改密码，数据操作异常');
        }
    }
    /**
     ***修改邮箱**
     * @param {string} userName 用户名
     * @param {string} email 新邮箱
     * @returns {Promise<void>}
     */
    async modifyMail(userName: string, email: string): Promise<void> {
        const conditions = { userName: userName },
            doc = { $set: { email: email } };
        try {
            model.user.updateOne(conditions, doc);
        } catch (error) {
            console.error(error);
            throw new Error('修改邮箱，数据操作异常');
        }
    }
    /**
     ***修改用户信息**
     * @param {string} conditions.userName 用户名
     * @param {string} doc.$set 修改的字段内容
     * @returns {Promise<void>}
     */
    async modifyUserInfo(conditions: any, doc: any): Promise<void> {
        try {
            model.user.updateOne(conditions, doc);
        } catch (error) {
            console.error(error);
            throw new Error('修改后台用户信息，数据操作异常');
        }
    }

    /**
     ***后台用户列表**
     * @param {Object} query 查询条件
     * @param {Object} sort 排序条件
     * @param {number} skip 分页条件
     * @param {number} limit 分页条数
     * @returns {Promise<{userList:any,count:number}>}
     */
    async findSystemUser(
        query: any,
        sort: any,
        skip: number,
        limit: number
    ): Promise<{
        userList: (Document)[];
        count: number;
    }> {
        try {
            const userList = await Promise.resolve(
                model.user
                    .find(query)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
            );
            const count = await Promise.resolve(model.taskLog.countDocuments(query));
            return { userList, count };
        } catch (error) {
            console.error(error);
            throw new Error('后台用户列表，数据操作异常');
        }
    }
}

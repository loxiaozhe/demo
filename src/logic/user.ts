/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User类，处理用户逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { Document } from 'mongoose';
import { model } from '../model';
import { utils } from '../util';

export class UserLogic {
    /**
     * **查询**
     * @param {string} mobile 手机号
     * @returns {Promise<Document>} 示例：{"name": "ABC", "pass": "123321","mobile": "18210294511"}
     */
    async findByMobile(mobile: string): Promise<Document> {
        return Promise.resolve(model.user.findOne({ mobile: mobile }));
    }
    /**
     * **注册**
     * @param {string} user.pass 密码
     * @param {string} user.mobile 手机号
     * @param {string} user.name 姓名
     * @returns {Promise<Document>} 示例：{"name": "ABC", "pass": "123321","mobile": "18210294511"}
     */
    async createUser(user: unknown): Promise<Document> {
        return Promise.resolve(model.user.create(user));
    }
    /**
     ***登录**
     * @param {string} mobile 手机号
     * @param {string} pass 密码
     * @returns {Promise<{ [name: string]: unknown }>} 示例：{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFCQyIsInBhc3MiOiIxMjM0NTYiLCJpYXQiOjE1NzM0NjIwOTEsImV4cCI6MTU3MzQ2MjExNn0.MoebgG-AbcaOH5rlxgbOSP0IMHkpmd_TGKs5wKzYV4k","success": true}
     */
    async login(mobile: string, pass: string): Promise<{ [name: string]: unknown }> {
        return Promise.resolve({ token: utils.getToken(mobile, pass), code: 200 });
    }
}

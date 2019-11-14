/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User类，处理用户逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { utils } from '../util';
import { model } from '../model';
import { Document } from 'mongoose';

export class UserLogic {
    /**
     * **获取用户**
     * @param {string} name 用户标识
     * @returns {Promise<{ [name: string]: unknown }>} 实例：{"id": "ABC", "name": "张三","age": 10}
     */
    async findUserByID(name: string): Promise<Document> {
        return Promise.resolve(model.user.findOne({ name: name }));
    }
    async createUser(user: unknown): Promise<Document> {
        return Promise.resolve(model.user.create(user));
    }
    /**
     *
     * @param {string} name 用户标识
     * @param {string} pass 用户密码
     * @returns {Promise<{ [name: string]: unknown }>} 示例：{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFCQyIsInBhc3MiOiIxMjM0NTYiLCJpYXQiOjE1NzM0NjIwOTEsImV4cCI6MTU3MzQ2MjExNn0.MoebgG-AbcaOH5rlxgbOSP0IMHkpmd_TGKs5wKzYV4k","success": true}
     */
    async login(name: string, pass: string): Promise<{ [name: string]: unknown }> {
        return Promise.resolve({ token: utils.getToken(name, pass), success: true });
    }
}

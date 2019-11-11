/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User类，处理用户逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { Util } from '../util';
export class UserLogic {
    /**
     * **获取用户**
     * @param {string} id 用户标识
     * @returns {Promise<{ [name: string]: unknown }>} 实例：{"id": "ABC", "name": "张三","age": 10}
     */
    async findUserByID(id: string): Promise<{ [name: string]: unknown }> {
        return Promise.resolve({ id: id, name: '张三', age: 10 });
    }
    async createUser(): Promise<{ [name: string]: unknown }> {
        return Promise.resolve({ name: '张三', age: 10, success: true });
    }
    /**
     *
     * @param {string} id 用户标识
     * @param {string} pass 用户密码
     * @returns {Promise<{ [name: string]: unknown }>} 实例：{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFCQyIsInBhc3MiOiIxMjM0NTYiLCJpYXQiOjE1NzM0NjIwOTEsImV4cCI6MTU3MzQ2MjExNn0.MoebgG-AbcaOH5rlxgbOSP0IMHkpmd_TGKs5wKzYV4k","success": true}
     */
    async login(id: string, pass: string): Promise<{ [name: string]: unknown }> {
        return Promise.resolve({ token: Util.getToken(id, pass), success: true });
    }
}

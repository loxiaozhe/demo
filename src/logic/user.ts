/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User类，处理用户逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
export class UserLogic {
    async findUserByID(id: string): Promise<{ [name: string]: unknown }> {
        return Promise.resolve({ name: '张三', age: 10 });
    }

    async createUser(): Promise<{ [name: string]: unknown }> {
        return Promise.resolve({ name: '张三', age: 10, success: true });
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：路由配置文件
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
const user_1 = require("../logic/user");
const user = new user_1.User();
/**
 * **routes数组定义说明**
 * @param {string} path 请求地址
 * @param {string} method 请求方式
 * @param {string} fn 业务函数
 * @param {string} middleware 中间件
 */
exports.routes = [
    {
        path: '/user/findOne',
        method: 'GET',
        fn: user.findUser
    },
    {
        path: '/user/create',
        method: 'POST',
        fn: user.createUser
    }
];

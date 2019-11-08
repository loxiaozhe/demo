/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：路由配置文件
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { controller } from '../controller/index';
import { IndexMiddleware } from '../middleware';
/**
 * **routes数组定义说明**
 * @param {string} path 请求地址
 * @param {string} method 请求方式
 * @param {string} fn 业务函数
 * @param {string} middleware 中间件
 */
export const routes = [
    {
        path: '/user/findOne',
        method: 'GET',
        middleware: IndexMiddleware.sessionMiddleware,
        fn: controller.user.findUser
    },
    {
        path: '/user/create',
        method: 'POST',
        middleware: IndexMiddleware.sessionMiddleware,
        fn: controller.user.createUser
    }
];

/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：路由配置文件
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { controller } from '../controller';
import { IndexMiddleware } from '../middleware';
/**
 * **routes数组定义说明**
 * @param {string} path 请求地址
 * @param {string} methods 请求方式 例如：'POST,GET'
 * @param {Function} fn 业务函数
 * @param {Function} middleware 中间件
 */
export const routes = [
    {
        root: '/unToken',
        routeList: [
            {
                path: '/login',
                methods: 'POST',
                middleware: IndexMiddleware.nullMiddleware,
                fn: controller.user.login
            },
            {
                path: '/getCode',
                methods: 'GET',
                middleware: IndexMiddleware.nullMiddleware,
                fn: controller.user.getCode
            },
            {
                path: '/findMobile',
                methods: 'GET',
                middleware: IndexMiddleware.nullMiddleware,
                fn: controller.unToken.findByMobile
            }
        ]
    },
    {
        root: '/user',
        routeList: [
            {
                path: '/logout',
                methods: 'POST',
                middleware: IndexMiddleware.userTokenMiddleware,
                fn: controller.user.logout
            },
            {
                path: '/modifyPassword',
                methods: 'POST',
                middleware: IndexMiddleware.userTokenMiddleware,
                fn: controller.user.modifyPassword
            },
            {
                path: '/bindMail',
                methods: 'POST',
                middleware: IndexMiddleware.userTokenMiddleware,
                fn: controller.user.modifyMail
            },
            {
                path: '/modifyMail',
                methods: 'POST',
                middleware: IndexMiddleware.userTokenMiddleware,
                fn: controller.user.modifyMail
            },
            {
                path: '/bindWarning',
                methods: 'POST',
                middleware: IndexMiddleware.userTokenMiddleware,
                fn: controller.user.bindWarning
            },
            {
                path: '/findByMobile',
                methods: 'GET',
                middleware: IndexMiddleware.userTokenMiddleware,
                fn: controller.user.findByMobile
            },
            {
                path: '/create',
                methods: 'POST',
                middleware: IndexMiddleware.nullMiddleware,
                fn: controller.user.createUser
            }
        ]
    },
    {
        root: '/statistics',
        routeList: [
            {
                path: '/getData',
                methods: 'GET',
                middleware: IndexMiddleware.nullMiddleware,
                fn: controller.statistics.getData
            },
            {
                path: '/getWeekData',
                methods: 'GET',
                middleware: IndexMiddleware.nullMiddleware,
                fn: controller.statistics.getWeekData
            },
            {
                path: '/findMobile',
                methods: 'GET',
                middleware: IndexMiddleware.nullMiddleware,
                fn: controller.unToken.findByMobile
            }
        ]
    }
];

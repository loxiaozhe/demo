/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：工具类
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { sign, verify } from 'jsonwebtoken';
import { serverConfig } from './config/serverConfig-dev';
import { constants } from 'fs';
export const utils = Object.assign(
    {},
    {
        /**
         * **获取token**
         * @param {string} id 用户标识
         * @param {string} pass 用户密码
         * @returns {string} 用户token 示例："eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFCQyIsInBhc3MiOiIxMjM0NTYiLCJpYXQiOjE1NzM0NTk3MjgsImV4cCI6MTU3MzQ1OTc1M30.oAOM8t8ggPcOkOH_gWGjyuAk-6onzql82bAFO57nLy8"
         */
        getToken(id: string, pass: string): string {
            return sign(
                {
                    id: id,
                    pass: pass
                },
                serverConfig.jwt.secret,
                { expiresIn: serverConfig.jwt.expiresIn }
            );
        },
        /**
         * **解析token**
         * @param {string} token 用户token
         * @returns {string|object} 示例 { id: 'ABC', pass: '123456', iat: 1573462091, exp: 1573462116 }
         */
        parseToken(token: string): string | object {
            return verify(token.split(' ')[1], serverConfig.jwt.secret);
        },
        isHanzi(value: string, max: number, min?: number): boolean {
            const reg = /[\u4e00-\u9fa5]/;
            min = min ? 0 : min;
            return reg.test(value) && min < value.length && value.length < max;
        },
        isMobile(value: string): boolean {
            const reg = /^1[3456789]\d{9}$/;
            return reg.test(value);
        },
        isPass(value: string): boolean {
            const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@&%#_])[a-zA-Z0-9~!@&%#_]{6,10}$/;
            return reg.test(value);
        }
    }
);

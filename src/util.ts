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
export class Util {
    /**
     * **获取token**
     * @param {string} id 用户标识
     * @param {string} pass 用户密码
     * @returns {string} 用户token 实例："eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFCQyIsInBhc3MiOiIxMjM0NTYiLCJpYXQiOjE1NzM0NTk3MjgsImV4cCI6MTU3MzQ1OTc1M30.oAOM8t8ggPcOkOH_gWGjyuAk-6onzql82bAFO57nLy8"
     */
    static getToken(id: string, pass: string): string {
        return sign(
            {
                id: id,
                pass: pass
            },
            serverConfig.jwt.secret,
            { expiresIn: serverConfig.jwt.expiresIn }
        );
    }
    /**
     * **解析token**
     * @param {string} token 用户token
     * @returns {string|object} 实例 { id: 'ABC', pass: '123456', iat: 1573462091, exp: 1573462116 }
     */
    static parseToken(token: string): string | object {
        return verify(token.split(' ')[1], serverConfig.jwt.secret);
    }
}

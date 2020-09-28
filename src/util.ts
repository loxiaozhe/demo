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
import * as svg from 'svg-captcha';
import * as lodash from 'lodash';
import { serverConfig } from './config/serverConfig-dev';
export const utils = Object.assign(
    { _: lodash },
    {
        /**
         * **获取token**
         * @param {string} userName 用户标识
         * @param {string} passWord 密码
         * @returns {string} 用户token 示例："eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFCQyIsInBhc3MiOiIxMjM0NTYiLCJpYXQiOjE1NzM0NTk3MjgsImV4cCI6MTU3MzQ1OTc1M30.oAOM8t8ggPcOkOH_gWGjyuAk-6onzql82bAFO57nLy8"
         */
        getToken(userName?: string, passWord?: string): string {
            return sign(
                {
                    userName: userName,
                    passWord: passWord
                },
                serverConfig.jwt.secret,
                { expiresIn: serverConfig.jwt.expiresIn }
            );
        },
        /**
         * **解析token**
         * @param {string} token 用户token
         * @returns {string|object} 示例 { userName: 'ABC', passWord: '123456', iat: 1573462091, exp: 1573462116 }
         */
        parseToken(token: string): string | object {
            return verify(token.split(' ')[1], serverConfig.jwt.secret);
        },
        /**
         * **汉字校验**
         * @param {string} value 字符串信息，必填
         * @param {number} max 最大长度，必填
         * @param {number} min 最小长度，选填
         * @returns {boolean} true|false
         */
        isHanzi(value: string, max: number, min?: number): boolean {
            const reg = /[\u4e00-\u9fa5]/;
            min = min ? 0 : min;
            return reg.test(value) && min < value.length && value.length < max;
        },
        /**
         * **手机号校验**
         * @param {string} value 手机号文本信息
         * @returns {boolean} true|false
         */
        isMobile(value: string): boolean {
            const reg = /^1[3456789]\d{9}$/;
            return reg.test(value);
        },
        /**
         * **密码校验**
         * @param {string} value 密码文本信息
         * @returns {boolean} true|false
         */
        isPass(value: string): boolean {
            //密码至少包含 数字和英文，长度32  3c56f5800775a85d77153044db1eb9b9
            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{20,35}$/;
            return reg.test(value);
        },
        /**
         * **用户名校验**
         * @param {string} value 用户名文本信息
         * @returns {boolean} true|false
         */
        isUserName(value: string): boolean {
            //用户名数字和英文组合，长度6-20
            const reg = /^[0-9A-Za-z]{6,20}$/;
            return reg.test(value);
        },
        /**
         * **邮箱校验**
         * @param {string} value 邮箱文本信息
         * @returns {boolean} true|false
         */
        isEmail(value: string): boolean {
            //邮箱格式：liyy@ucap.com.cn
            const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            return reg.test(value);
        },
        /**
         * **生成验证码**
         * @param {string} value 时间戳信息信息
         * @returns {boolean} true|false
         */
        getCode(value: string): svg.CaptchaObj {
            if (!value) return null;
            const config: svg.ConfigObject = {};
            config.size = 4;
            config.ignoreChars = 'pq0ol1i';
            config.color = true;
            config.noise = 4;
            config.height = 40;
            config.width = 110;
            config.fontSize = 50;
            return svg.create(config);
        }
    }
);

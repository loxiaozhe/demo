/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：定义开发模式下的配置文件
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
export const serverConfig = {
    /**
     * **定义服务器配置**
     * @param prot 启动端口
     * @param jwt.secret token密钥
     * @param jwt.path 过滤token验证路径
     * @param jwt.expiresIn 超时时间
     */
    prot: 3000,
    jwt: {
        secret: 'backSystem',
        path: [/^\/unToken/],
        expiresIn: '1h'
    },
    mogodb: {
        uri: 'mongodb://47.96.254.45:27017/ygwDB',
        user: 'ygw',
        pass: 'ygw321'
    }
};

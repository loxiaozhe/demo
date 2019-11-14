/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：mongodb实例
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import * as mongoose from 'mongoose';
import { serverConfig } from './config/serverConfig-dev';
export class DB {
    static connect() {
        mongoose.connect(serverConfig.mogodb.uri, {
            user: serverConfig.mogodb.user,
            pass: serverConfig.mogodb.pass,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        // 连接错误
        mongoose.connection.on('error', (error) => {
            console.warn('数据库连接失败!', error);
        });

        // 连接成功
        mongoose.connection.once('open', () => {
            console.log('数据库连接成功!');
        });

        // 返回实例
        return mongoose;
    }
}

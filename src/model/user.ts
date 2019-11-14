/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User数据结构模型
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { prop, getModelForClass } from '@typegoose/typegoose';
import { utils } from '../util';
class User {
    @prop({
        required: true,
        validate: [
            {
                validator: (val) => utils.isHanzi(val, 4, 2),
                message: `name:{VALUE},不满足2-4个汉字`
            }
        ]
    })
    name: string;
    @prop({
        required: true,
        validate: [
            {
                validator: (val) => utils.isPass(val),
                message: `pass:{VALUE},必须包含大小写字母，特殊字符，且长度为8到16位`
            }
        ]
    })
    pass: string;
    @prop({
        required: true,
        validate: [
            {
                validator: (val) => utils.isMobile(val),
                message: `mobile:{VALUE},不满足手机号格式`
            }
        ]
    })
    mobile: string;
}
export const UserModel = getModelForClass(User);

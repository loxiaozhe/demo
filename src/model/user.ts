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
                validator: (val) => utils.isUserName(val),
                message: `userName:{VALUE},必须包含数字和字母，且长度为6到20位`
            }
        ]
    })
    userName: string;
    @prop({
        required: true,
        validate: [
            {
                validator: (val) => utils.isPass(val),
                message: `pass:{VALUE},必须包含数字和字母，且长度为32位`
            }
        ]
    })
    passWord: string;
    @prop({
        required: true,
        validate: [
            {
                validator: (val) => utils.isEmail(val),
                message: `email:{VALUE},邮箱格式不正确`
            }
        ]
    })
    email: string;
    @prop({
        required: true
    })
    userID: string;
    @prop({
        required: true
    })
    domain: string;
    @prop({
        required: true
    })
    warning: string;
    @prop({
        required: true
    })
    isEnable: boolean;
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
                validator: (val) => utils.isMobile(val),
                message: `mobile:{VALUE},不满足手机号格式`
            }
        ]
    })
    mobile: string;
    @prop({
        required: true
    })
    permission: any;
    @prop({
        required: true
    })
    createDate: string;
}
export const UserModel = getModelForClass(User);

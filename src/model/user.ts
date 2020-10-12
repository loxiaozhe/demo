/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User数据结构模型
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { prop, index, getModelForClass } from '@typegoose/typegoose';
import * as Moment from 'moment';
import { utils } from '../util';
//创建库表索引
@index({ userID: 1 })
@index({ userName: 1 })
class User {
    @prop({
        required: true,
        trim: true,
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
        trim: true,
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
        trim: true,
        validate: [
            {
                validator: (val) => utils.isEmail(val),
                message: `email:{VALUE},邮箱格式不正确`
            }
        ]
    })
    email: string;
    @prop({
        required: true,
        trim: true
    })
    userID: string;
    /*  @prop({
        trim:true,
        required: true
    })
    domain: string; */
    @prop({
        trim: true,
        required: true,
        default: ''
    })
    warning: string;
    @prop({
        trim: true,
        required: true,
        default: '1' /* -1 停用 ，1 启用 */
    })
    isEnable: string;
    @prop({
        trim: true,
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
        trim: true,
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
        trim: true,
        required: true
    })
    permission: any;
    @prop({
        trim: true,
        required: true,
        default: Moment().format('YYYY-MM-DD HH:MM:SS')
    })
    createDate: string;
}
export const UserModel = getModelForClass(User);

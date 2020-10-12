/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：User数据结构模型
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { index, prop, getModelForClass } from '@typegoose/typegoose';
class Statistics {
    @prop({
        trim: true,
        required: true
    })
    userTotal: number;

    @prop({
        trim: true,
        required: true
    })
    newUser: number;

    @prop({
        trim: true,
        required: true
    })
    serviceTotal: number;

    @prop({
        trim: true,
        required: true
    })
    newService: number;

    @prop({
        trim: true,
        required: true
    })
    procureTotal: number;

    @prop({
        trim: true,
        required: true
    })
    apiTotal: number;

    @prop({
        trim: true,
        required: true
    })
    newApi: number;

    @prop({
        trim: true,
        required: true
    })
    modifyApi: number;

    @prop({
        trim: true,
        required: true
    })
    hotProcure: any;

    @prop({
        trim: true,
        required: true
    })
    hotTem: any;

    @prop({
        trim: true,
        required: true
    })
    originNum: number;

    @prop({
        trim: true,
        required: true
    })
    serviceNum: number;

    @prop({
        trim: true,
        required: true
    })
    useFor: any;

    @prop({
        trim: true,
        required: true
    })
    createTime: string;

    @prop({
        trim: true,
        required: true
    })
    callTaskSuccess: number;

    @prop({
        trim: true,
        required: true
    })
    callTaskFail: number;

    @prop({
        trim: true,
        required: true
    })
    successRate: number;

    @prop({
        trim: true,
        required: true
    })
    hotTaskUser: any;
}
export const StatisticsModel = getModelForClass(Statistics);

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
        required: true
    })
    userTotal: number;

    @prop({
        required: true
    })
    newUser: number;

    @prop({
        required: true
    })
    serviceTotal: number;

    @prop({
        required: true
    })
    newService: number;

    @prop({
        required: true
    })
    procureTotal: number;

    @prop({
        required: true
    })
    apiTotal: number;

    @prop({
        required: true
    })
    newApi: number;

    @prop({
        required: true
    })
    modifyApi: number;

    @prop({
        required: true
    })
    hotProcure: any;

    @prop({
        required: true
    })
    hotTem: any;

    @prop({
        required: true
    })
    originNum: number;

    @prop({
        required: true
    })
    serviceNum: number;

    @prop({
        required: true
    })
    useFor: any;

    @prop({
        required: true
    })
    createTime: string;

    @prop({
        required: true
    })
    callTaskSuccess: number;

    @prop({
        required: true
    })
    callTaskFail: number;

    @prop({
        required: true
    })
    successRate: number;

    @prop({
        required: true
    })
    hotTaskUser: any;
}
export const StatisticsModel = getModelForClass(Statistics);

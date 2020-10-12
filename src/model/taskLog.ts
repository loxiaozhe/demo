/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：日志数据结构模型
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { prop, index, getModelForClass } from '@typegoose/typegoose';
//创建库表索引
@index({ requestTime: 1 })
class TaskLog {
    @prop({
        trim: true,
        required: true
    })
    sessionId: string;
    @prop({
        trim: true,
        required: true
    })
    serviceId: string;
    @prop({
        trim: true,
        required: true
    })
    taskId: string;
    @prop({
        trim: true,
        required: true
    })
    taskName: string;
    @prop({
        trim: true,
        required: true
    })
    remoteAddr: string;
    @prop({
        trim: true,
        required: true
    })
    requestTime: string;
    @prop({
        trim: true,
        required: true
    })
    status: string;
    @prop({
        trim: true,
        required: true
    })
    result: string;
}
export const TaskLogModel = getModelForClass(TaskLog);

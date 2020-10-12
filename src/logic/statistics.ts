/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：StatisticsLogic处理统计数据逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2020-09
 */
import { Document } from 'mongoose';
import * as moment from 'moment';
import { model } from '../model';
import { utils } from '../util';

export class StatisticsLogic {
    /**
     * **查询前一天的统计数据**
     * @returns {Promise<Document>}
     */
    async getData(): Promise<Document> {
        try {
            return await Promise.resolve(
                model.statistics.findOne({
                    createTime: moment()
                        .subtract(1, 'days')
                        .format('YYYY-MM-DD')
                })
            );
        } catch (error) {
            console.error(error);
            throw new Error('数据操作异常');
        }
    }
    /**
     * **查询最近7天的监控数据**
     * @returns {Promise<any>}
     */
    async getWeekData(): Promise<{
        originNum: number[];
        serviceNum: number[];
        callTaskSuccessArr: number[];
        callTaskFailArr: number[];
        successRateArr: number[];
        timeArr: string[];
    }> {
        let dataList;
        try {
            dataList = await Promise.resolve(
                model.statistics
                    .find({
                        createTime: {
                            $gte: moment()
                                .subtract(1, 'weeks')
                                .format('YYYY-MM-DD')
                        }
                    })
                    .sort({ createTime: 1 })
            );
        } catch (error) {
            console.error(error);
            throw new Error('数据操作异常');
        }
        let originNumArr: number[] = [],
            serviceNumArr: number[] = [],
            timeArr: string[] = [];
        // 新增调用日志成功失败次数、成功率
        let callTaskSuccessArr: number[] = [],
            callTaskFailArr: number[] = [],
            successRateArr: number[] = [];
        if (utils._.isArray(dataList) && !utils._.isEmpty(dataList)) {
            dataList.forEach((item) => {
                originNumArr.push(item.originNum);
                serviceNumArr.push(item.serviceNum);
                callTaskSuccessArr.push(item.callTaskSuccess || 0);
                callTaskFailArr.push(item.callTaskFail || 0);
                successRateArr.push(item.successRate || 0);
                timeArr.push(item.createTime.split('-')[1] + '/' + item.createTime.split('-')[2]);
            });
            return {
                originNum: originNumArr,
                serviceNum: serviceNumArr,
                callTaskSuccessArr: callTaskSuccessArr,
                callTaskFailArr: callTaskFailArr,
                successRateArr: successRateArr,
                timeArr: timeArr
            };
        } else {
            return null;
        }
    }
}

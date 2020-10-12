/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：StatisticsController统计功能业务
 *
 * @author yuangw<yuangw@ucap.com.cn>  2020-09
 */
import { Context } from 'koa';
import { logic } from '../logic';
export class StatisticsController {
    /**
     * **获取统计数据**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async getData(ctx: Context): Promise<void> {
        try {
            const data = await logic.statistics.getData();
            const weekData = await logic.statistics.getWeekData();
            ctx.body = { data: data, weekData: weekData };
        } catch (error) {
            throw error;
        }
    }
}

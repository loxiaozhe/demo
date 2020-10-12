/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：service服务管理模块功能业务
 *
 * @author yuangw<yuangw@ucap.com.cn>  2020-09
 */
import { Context } from 'koa';
import { logic } from '../logic';
export class ServiceController {
    /**
     * **获取日志列表数据**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async getTaskLogList(ctx: Context): Promise<void> {
        let data = {
            status: ctx.request.body.status || 2, // 默认2 所有的状态
            key: ctx.request.body.key || '',
            pageSize: ctx.request.body.pageSize || 10,
            pageNum: ctx.request.body.pageNum || 1,
            sort: ctx.request.body.sort || { status: -1, startDate: -1 },
            startTime: ctx.request.body.startTime || '',
            endTime: ctx.request.body.endTime || ''
        };
        let query = [],
            queryAll = [],
            limit = Number(data.pageSize),
            skip = (data.pageNum - 1) * data.pageSize;
        if (data.key) {
            queryAll.push({ serviceId: new RegExp(data.key) });
            queryAll.push({ taskName: new RegExp(data.key) });
        } else {
            queryAll.push({});
        }
        data.status != '2' ? query.push({ status: data.status }) : query.push({});

        if (data.startTime && data.endTime) {
            query.push({ requestTime: { $gte: data.startTime } });
            query.push({ requestTime: { $lte: data.endTime } });
        }

        try {
            const result = await logic.service.getTaskLogList(query, queryAll, data.sort, limit, skip);
            ctx.body = { data: result.dataList, totalNum: result.count };
        } catch (error) {
            throw error;
        }
    }
    /**
     * **获取日志详情数据**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async getLogDetail(ctx: Context): Promise<void> {
        const id = ctx.params.id || '';
        if (id) {
            try {
                const data = await logic.service.getLogDetail(id);
                ctx.body = { data: data };
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error('缺少数据ID');
        }
    }
    /**
     * **删除日志数据**
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async deleteLog(ctx: Context): Promise<void> {
        const idArr = ctx.request.body.id || [];
        if (idArr.length > 0) {
            try {
                for (const i of idArr) {
                    const data = await logic.service.deleteLog(i);
                    console.log(`记录id=${i},成功删除${data.deletedCount}条数据`);
                }
                ctx.body = { data: { message: '日志删除成功' } };
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error('缺少数据ID');
        }
    }
}

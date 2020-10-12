/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：ServiceLogic处理服务管理数据逻辑
 *
 * @author yuangw<yuangw@ucap.com.cn>  2020-09
 */
import { Document } from 'mongoose';
import { model } from '../model';

export class ServiceLogic {
    /**
     * **获取日志列表数据**
     *
     * @param {Object} query 查询and条件
     * @param {Object} queryAll 查询or条件
     * @param {Object} sort 排序条件
     * @param {number} skip 分页条件
     * @param {number} limit 分页条数
     *
     * @returns {Promise<{dataList:any,count:number}>}
     */
    async getTaskLogList(
        query: any,
        queryAll: any,
        sort: any,
        limit: number,
        skip: number
    ): Promise<{
        dataList: (Document)[];
        count: number;
    }> {
        let options = { fields: '-result' };
        try {
            const dataList = await Promise.resolve(
                model.taskLog
                    .find({ $or: queryAll, $and: query }, options.fields)
                    .sort(sort)
                    .limit(limit)
                    .skip(skip)
            );
            const count = await Promise.resolve(model.taskLog.countDocuments({ $or: queryAll, $and: query }));
            return { dataList, count };
        } catch (error) {
            console.error(error);
            throw new Error('日志列表，数据操作异常');
        }
    }
    /**
     * **获取日志详情数据**
     * @param {string} id 数据id
     * @returns {Promise<Document>}
     */
    async getLogDetail(id: string): Promise<Document> {
        try {
            return await Promise.resolve(model.taskLog.findOne({ _id: id }));
        } catch (error) {
            console.error(error);
            throw new Error('日志详情，数据操作异常');
        }
    }
    /**
     * **删除日志数据**
     * @param {string} id 数据id
     * @returns {Promise<{ok?: number;n?: number;} & {deletedCount?: number;}>}
     */
    async deleteLog(id: string): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        try {
            return await Promise.resolve(model.taskLog.deleteOne({ _id: id }));
        } catch (error) {
            console.error(error);
            throw new Error('删除日志，数据操作异常');
        }
    }
}

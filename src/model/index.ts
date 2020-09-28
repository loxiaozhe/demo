/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { UserModel } from './user';
import { StatisticsModel } from './statistics';
import { TaskLogModel } from './taskLog';
export const model = {
    user: UserModel,
    statistics: StatisticsModel,
    taskLog: TaskLogModel
};

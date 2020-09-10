/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：初始化所有controller
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { UserController } from './user';
import { UnTokenController } from './unToken';
import { StatisticsController } from './statistics';
/**
 * @summary controller配置所有的控制器，处理具体业务
 */
export const controller = {
    user: new UserController(),
    unToken: new UnTokenController(),
    statistics: new StatisticsController()
};

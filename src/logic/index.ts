/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 描述：初始化所有logic
 *
 * @author yuangw<yuangw@ucap.com.cn>  2019-11
 */
import { UserLogic } from '../logic/user';
/**
 * @summary logic配置所有的业务层，处理具体业务
 */
export const logic = {
    user: new UserLogic()
};

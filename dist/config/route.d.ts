/// <reference types="koa" />
/**
 * **routes数组定义说明**
 * @param {string} path 请求地址
 * @param {string} method 请求方式
 * @param {string} fn 业务函数
 * @param {string} middleware 中间件
 */
export declare const routes: {
    path: string;
    method: string;
    fn: (ctx: import("koa").Context) => void;
}[];

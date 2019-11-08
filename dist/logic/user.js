"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    findUser(ctx) {
        ctx.body = { name: '张三', age: 10 };
    }
    createUser(ctx) {
        ctx.body = { name: '张三', age: 10, success: true };
    }
}
exports.User = User;

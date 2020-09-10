"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var logic_1 = require("../logic");
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getCode = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, code;
            return __generator(this, function (_a) {
                queryObj = ctx.request.query;
                code = util_1.utils.getCode(queryObj.t);
                if (code == null) {
                    throw new Error('获取验证码出错');
                }
                ctx.session.code = code.text.toLowerCase();
                ctx.set({ 'type': 'svg' });
                ctx.body = code.data;
                return [2];
            });
        });
    };
    UserController.prototype.login = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, code, user, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = ctx.request.body, userName = _a.userName, password = _a.password, code = _a.code;
                        if (userName && !util_1.utils.isUserName(userName)) {
                            throw new Error('用户名格式不正确');
                        }
                        if (password && !util_1.utils.isPass(password)) {
                            throw new Error('密码格式不正确');
                        }
                        if (code && ctx.session.code != code.toLowerCase()) {
                            throw new Error('验证码不正确');
                        }
                        return [4, logic_1.logic.user.findByUserName(userName, true)];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new Error('用户不存在');
                        }
                        if (!(user.get('password') && user.get('password') !== password)) return [3, 2];
                        throw new Error('用户名或密码错误');
                    case 2:
                        _b = ctx;
                        return [4, logic_1.logic.user.login(user)];
                    case 3:
                        _b.body = _c.sent();
                        _c.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    UserController.prototype.logout = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userName;
            return __generator(this, function (_a) {
                userName = ctx.request.body.userName;
                if (!userName) {
                    throw new Error('该用户未登陆或登陆超时');
                }
                ctx.body = { "msg": "退出成功" };
                return [2];
            });
        });
    };
    UserController.prototype.modifyPassword = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, aginPassword, dataUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, userName = _a.userName, password = _a.password, aginPassword = _a.aginPassword;
                        if (!userName) {
                            throw new Error('该用户未登陆或登陆超时');
                        }
                        if (!password || !aginPassword) {
                            throw new Error('旧密码或新密码不能为空');
                        }
                        if (!util_1.utils.isPass(aginPassword)) {
                            throw new Error('新密码格式不正确');
                        }
                        return [4, logic_1.logic.user.findByUserName(userName, true)];
                    case 1:
                        dataUser = _b.sent();
                        if (!(dataUser.get('password') === password)) return [3, 3];
                        return [4, logic_1.logic.user.modifyPassword(userName, aginPassword)];
                    case 2:
                        _b.sent();
                        ctx.body = { "msg": "修改密码操作成功" };
                        return [3, 4];
                    case 3: throw new Error('旧密码错误');
                    case 4: return [2];
                }
            });
        });
    };
    UserController.prototype.modifyMail = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, email, type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, userName = _a.userName, email = _a.email, type = _a.type;
                        if (!email || !util_1.utils.isEmail(email)) {
                            throw new Error('邮箱格式不正确');
                        }
                        if (!type) {
                            throw new Error('缺少邮箱修改类型');
                        }
                        if (!userName) {
                            throw new Error('该用户未登陆或登陆超时');
                        }
                        return [4, logic_1.logic.user.modifyMail(userName, email)];
                    case 1:
                        _b.sent();
                        ctx.body = type === 'modify' ? { "msg": "邮箱修改成功" } : { "msg": "邮箱绑定成功" };
                        return [2];
                }
            });
        });
    };
    UserController.prototype.bindWarning = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, warning;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, userName = _a.userName, warning = _a.warning;
                        if (!warning) {
                            throw new Error('预警类型不正确');
                        }
                        if (!userName) {
                            throw new Error('该用户未登陆或登陆超时');
                        }
                        return [4, logic_1.logic.user.modifyUserInfo({ userName: userName }, { $set: { warning: warning } })];
                    case 1:
                        _b.sent();
                        ctx.body = { "msg": "预警设置成功" };
                        return [2];
                }
            });
        });
    };
    UserController.prototype.findByMobile = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx;
                        return [4, logic_1.logic.user.findByUserName(ctx.request.body.mobile)];
                    case 1:
                        _a.body = _b.sent();
                        return [2];
                }
            });
        });
    };
    UserController.prototype.createUser = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, pass, mobile, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = ctx.request.body, name = _a.name, pass = _a.pass, mobile = _a.mobile;
                        _b = ctx;
                        return [4, logic_1.logic.user.createUser({ name: name, pass: pass, mobile: mobile })];
                    case 1:
                        _b.body = _c.sent();
                        return [2];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;

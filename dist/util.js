"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var serverConfig_dev_1 = require("./config/serverConfig-dev");
exports.utils = Object.assign({}, {
    getToken: function (id, pass) {
        return jsonwebtoken_1.sign({
            id: id,
            pass: pass
        }, serverConfig_dev_1.serverConfig.jwt.secret, { expiresIn: serverConfig_dev_1.serverConfig.jwt.expiresIn });
    },
    parseToken: function (token) {
        return jsonwebtoken_1.verify(token.split(' ')[1], serverConfig_dev_1.serverConfig.jwt.secret);
    },
    isHanzi: function (value, max, min) {
        var reg = /[\u4e00-\u9fa5]/;
        min = min ? 0 : min;
        return reg.test(value) && min < value.length && value.length < max;
    },
    isMobile: function (value) {
        var reg = /^1[3456789]\d{9}$/;
        return reg.test(value);
    },
    isPass: function (value) {
        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@&%#_])[a-zA-Z0-9~!@&%#_]{6,10}$/;
        return reg.test(value);
    }
});

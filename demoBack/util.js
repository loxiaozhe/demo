"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var svg = require("svg-captcha");
var serverConfig_dev_1 = require("./config/serverConfig-dev");
exports.utils = Object.assign({}, {
    getToken: function (userName, passWord) {
        return jsonwebtoken_1.sign({
            userName: userName,
            passWord: passWord
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
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{20,35}$/;
        return reg.test(value);
    },
    isUserName: function (value) {
        var reg = /^[0-9A-Za-z]{6,20}$/;
        return reg.test(value);
    },
    isEmail: function (value) {
        var reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        return reg.test(value);
    },
    getCode: function (value) {
        if (!value)
            return null;
        var config = {};
        config.size = 4;
        config.ignoreChars = 'pq0ol1i';
        config.color = true;
        config.noise = 4;
        config.height = 40;
        config.width = 110;
        config.fontSize = 50;
        return svg.create(config);
    }
});

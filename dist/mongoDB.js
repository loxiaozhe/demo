"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var serverConfig_dev_1 = require("./config/serverConfig-dev");
var DB = (function () {
    function DB() {
    }
    DB.connect = function () {
        mongoose.connect(serverConfig_dev_1.serverConfig.mogodb.uri, {
            user: serverConfig_dev_1.serverConfig.mogodb.user,
            pass: serverConfig_dev_1.serverConfig.mogodb.pass,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        mongoose.connection.on('error', function (error) {
            console.warn('数据库连接失败!', error);
        });
        mongoose.connection.once('open', function () {
            console.log('数据库连接成功!');
        });
        return mongoose;
    };
    return DB;
}());
exports.DB = DB;

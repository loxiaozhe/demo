"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var unToken_1 = require("./unToken");
var statistics_1 = require("./statistics");
exports.controller = {
    user: new user_1.UserController(),
    unToken: new unToken_1.UnTokenController(),
    statistics: new statistics_1.StatisticsController()
};

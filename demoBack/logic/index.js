"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var statistics_1 = require("./statistics");
exports.logic = {
    user: new user_1.UserLogic(),
    statistics: new statistics_1.StatisticsLogic()
};

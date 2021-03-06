"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typegoose_1 = require("@typegoose/typegoose");
var util_1 = require("../util");
var User = (function () {
    function User() {
    }
    __decorate([
        typegoose_1.prop({
            required: true,
            validate: [
                {
                    validator: function (val) { return util_1.utils.isUserName(val); },
                    message: "userName:{VALUE},\u5FC5\u987B\u5305\u542B\u6570\u5B57\u548C\u5B57\u6BCD\uFF0C\u4E14\u957F\u5EA6\u4E3A6\u523020\u4F4D"
                }
            ]
        }),
        __metadata("design:type", String)
    ], User.prototype, "userName", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
            validate: [
                {
                    validator: function (val) { return util_1.utils.isPass(val); },
                    message: "pass:{VALUE},\u5FC5\u987B\u5305\u542B\u6570\u5B57\u548C\u5B57\u6BCD\uFF0C\u4E14\u957F\u5EA6\u4E3A32\u4F4D"
                }
            ]
        }),
        __metadata("design:type", String)
    ], User.prototype, "passWord", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
            validate: [
                {
                    validator: function (val) { return util_1.utils.isEmail(val); },
                    message: "email:{VALUE},\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
                }
            ]
        }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", String)
    ], User.prototype, "userID", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", String)
    ], User.prototype, "domain", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", String)
    ], User.prototype, "warning", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isEnable", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
            validate: [
                {
                    validator: function (val) { return util_1.utils.isHanzi(val, 4, 2); },
                    message: "name:{VALUE},\u4E0D\u6EE1\u8DB32-4\u4E2A\u6C49\u5B57"
                }
            ]
        }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
            validate: [
                {
                    validator: function (val) { return util_1.utils.isMobile(val); },
                    message: "mobile:{VALUE},\u4E0D\u6EE1\u8DB3\u624B\u673A\u53F7\u683C\u5F0F"
                }
            ]
        }),
        __metadata("design:type", String)
    ], User.prototype, "mobile", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Object)
    ], User.prototype, "permission", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", String)
    ], User.prototype, "createDate", void 0);
    return User;
}());
exports.UserModel = typegoose_1.getModelForClass(User);

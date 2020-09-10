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
var Statistics = (function () {
    function Statistics() {
    }
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "userTotal", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "newUser", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "serviceTotal", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "newService", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "procureTotal", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "apiTotal", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "newApi", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "modifyApi", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Object)
    ], Statistics.prototype, "hotProcure", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Object)
    ], Statistics.prototype, "hotTem", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "originNum", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "serviceNum", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Object)
    ], Statistics.prototype, "useFor", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", String)
    ], Statistics.prototype, "createTime", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "callTaskSuccess", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "callTaskFail", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Number)
    ], Statistics.prototype, "successRate", void 0);
    __decorate([
        typegoose_1.prop({
            required: true,
        }),
        __metadata("design:type", Object)
    ], Statistics.prototype, "hotTaskUser", void 0);
    return Statistics;
}());
exports.StatisticsModel = typegoose_1.getModelForClass(Statistics);

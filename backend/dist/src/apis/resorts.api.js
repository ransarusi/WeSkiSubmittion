"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resortsRouter = void 0;
var express_1 = require("express");
var resorts_json_1 = __importDefault(require("../../assets/resorts.json"));
var resortsRouter = (0, express_1.Router)();
exports.resortsRouter = resortsRouter;
resortsRouter.get("/", function (req, res) {
    res.send(resorts_json_1.default);
});
//# sourceMappingURL=resorts.api.js.map
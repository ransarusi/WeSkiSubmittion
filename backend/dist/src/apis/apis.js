"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
var express_1 = require("express");
var resorts_api_1 = require("./resorts.api");
var search_api_1 = require("./search.api");
var mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
mainRouter.use('/resorts', resorts_api_1.resortsRouter);
mainRouter.use('/search', search_api_1.searchRouter);
//# sourceMappingURL=apis.js.map
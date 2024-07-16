"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelsProviderRegistry = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var apis_1 = require("./apis/apis");
var HotelsProviderRegistry_1 = require("./services/HotelsProvidersServices/HotelsProviderRegistry");
var ProviderAService_1 = require("./services/HotelsProvidersServices/ProviderAService");
var app = (0, express_1.default)();
var port = 5000;
exports.hotelsProviderRegistry = new HotelsProviderRegistry_1.HotelsProviderRegistry();
exports.hotelsProviderRegistry.addProvider(new ProviderAService_1.ProviderAService());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/hello', function (req, res) {
    res.send('Hello, World!');
});
app.use('/', apis_1.mainRouter);
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map
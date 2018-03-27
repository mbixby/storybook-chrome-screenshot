"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var addons_1 = require("@storybook/addons");
var imagesLoaded = require("imagesloaded");
var constants_1 = require("../../core/constants");
var utils_1 = require("../../core/utils");
var screenshot_options_1 = require("../../screenshot-options");
var hoc_1 = require("./hoc");
var withScreenshot = function (options) {
    if (options === void 0) { options = {}; }
    var _a = screenshot_options_1.mergeScreenshotOptions(options), delay = _a.delay, viewport = _a.viewport, namespace = _a.namespace;
    var channel = addons_1.default.getChannel();
    return function (getStory, ctx) {
        var component = getStory();
        var withContext = function (context) {
            var emit = function (type) {
                channel.emit(type, __assign({}, context, { viewport: viewport,
                    namespace: namespace }));
            };
            return hoc_1.hoc(component, {
                beforeCreate: function () {
                    emit(constants_1.EventTypes.COMPONENT_INIT);
                },
                mounted: function () {
                    var _this = this;
                    emit(constants_1.EventTypes.COMPONENT_MOUNT);
                    imagesLoaded(this.$el, function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, utils_1.sleep(delay)];
                                case 1:
                                    _a.sent();
                                    emit(constants_1.EventTypes.COMPONENT_READY);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                },
            });
        };
        if (ctx) {
            return withContext(ctx);
        }
        return function (context) { return withContext(context); };
    };
};
exports.default = withScreenshot;
//# sourceMappingURL=withScreenshot.js.map
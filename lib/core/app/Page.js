"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var events_1 = require("events");
var path = require("path");
var qs = require("query-string");
var constants_1 = require("../constants");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(page, url, options, consoleHandler) {
        var _this = _super.call(this) || this;
        _this.page = page;
        _this.url = url;
        _this.options = options;
        _this.page.on('console', function (data) {
            consoleHandler(data.type, data.text);
        });
        return _this;
    }
    Page.prototype.goto = function (phase, query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var q, url, _a;
            return __generator(this, function (_b) {
                q = __assign({}, query, (_a = { full: 1 }, _a[constants_1.PhaseIdentity] = phase, _a));
                url = this.url + "?" + qs.stringify(q);
                return [2 /*return*/, this.page.goto(url, {
                        timeout: this.options.browserTimeout,
                        waitUntil: [
                            'domcontentloaded',
                        ],
                    })];
            });
        });
    };
    Page.prototype.screenshot = function (story) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, cwd, outputDir, injectFiles, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options, cwd = _a.cwd, outputDir = _a.outputDir, injectFiles = _a.injectFiles;
                        return [4 /*yield*/, this.page.setViewport(story.viewport)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([
                                this.waitComponentReady(),
                                this.goto(constants_1.PhaseTypes.CAPTURE, {
                                    selectKind: story.kind,
                                    selectStory: story.story,
                                }),
                            ])];
                    case 2:
                        _b.sent();
                        file = path.join(outputDir, story.filename);
                        return [4 /*yield*/, Promise.all(injectFiles.map(function (fpath) { return (_this.page.addScriptTag({
                                path: fpath,
                            })); }))];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.page.screenshot({
                                path: path.resolve(cwd, file),
                                fullPage: true,
                            })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, file];
                }
            });
        });
    };
    Page.prototype.exposeSetScreenshotStories = function () {
        var _this = this;
        return this.exposeFunction('setScreenshotStories', function (stories) {
            _this.emit('handleScreenshotStories', stories);
        });
    };
    Page.prototype.waitScreenshotStories = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.once('handleScreenshotStories', function (stories) {
                resolve(stories);
            });
        });
    };
    // tslint:disable-next-line:no-any
    Page.prototype.exposeFunction = function (name, fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.exposeFunction(name, fn)];
            });
        });
    };
    Page.prototype.waitComponentReady = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.once(constants_1.EventTypes.COMPONENT_READY, resolve);
        });
    };
    return Page;
}(events_1.EventEmitter));
exports.default = Page;
//# sourceMappingURL=Page.js.map
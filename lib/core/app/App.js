"use strict";
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
var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var mkdirp = require("mkdirp");
var logSymbols = require("log-symbols");
var node_emoji_1 = require("node-emoji");
var chalk_1 = require("chalk");
var constants_1 = require("../constants");
var inspect = require("util-inspect");
var utils_1 = require("../utils");
var App = /** @class */ (function () {
    function App(options, store, terminal, server, browser) {
        this.options = options;
        this.store = store;
        this.terminal = terminal;
        this.server = server;
        this.browser = browser;
        this.startTime = Date.now();
    }
    App.prototype.validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cmd, cwd, configDir;
            return __generator(this, function (_b) {
                _a = this.options, cmd = _a.cmd, cwd = _a.cwd, configDir = _a.configDir;
                this.terminal.log('CLI Options', inspect(this.options));
                if (!fs.existsSync(cmd)) {
                    this.terminal.error("Storybook does not exists. First, let's setup a Storybook!\n        See: https://storybook.js.org/basics/quick-start-guide/");
                    return [2 /*return*/];
                }
                if (!fs.existsSync(path.resolve(cwd, configDir, 'config.js'))) {
                    this.terminal.error("\"" + configDir + "/config.js\" does not exists.");
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    App.prototype.launch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.terminal
                            .section('green', constants_1.PhaseTypes.LAUNCH, 'Launching storybook server ...')
                            .blank();
                        return [4 /*yield*/, Promise.all([
                                this.server.start(),
                                this.browser.launch(),
                            ])];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.browser.createPages(this.server.getURL(), function (type, text) {
                                _this.terminal.log('BROWSER', type + ": " + text.trim());
                            })];
                    case 2:
                        _a.pages = _b.sent();
                        this.first = this.pages[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.prepare = function () {
        var _this = this;
        this.terminal
            .section('cyan', constants_1.PhaseTypes.PREPARE, 'Fetching the target components ...')
            .blank();
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        mkdirp.sync(this.options.outputDir);
                        this.first.waitScreenshotStories().then(function (stories) {
                            _this.store.set(stories);
                            resolve();
                        }).catch(reject);
                        return [4 /*yield*/, this.first.exposeSetScreenshotStories()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.first.goto(constants_1.PhaseTypes.PREPARE)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        reject(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.capture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var stories, parallel, chunkedStories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stories = this.store.get();
                        parallel = Math.min(stories.length, this.options.parallel);
                        chunkedStories = _.chunk(stories, Math.max(1, Math.ceil(stories.length / parallel)));
                        this.terminal
                            .section('yellow', constants_1.PhaseTypes.CAPTURE, 'Capturing component screenshots ...')
                            .blank()
                            .progressStart(node_emoji_1.emojify(':camera:  [:bar] :current/:total'), stories.length);
                        return [4 /*yield*/, Promise.all(chunkedStories.map(function (arr, i) { return __awaiter(_this, void 0, void 0, function () {
                                var page, _i, arr_1, story;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            page = this.pages[i];
                                            _i = 0, arr_1 = arr;
                                            _a.label = 1;
                                        case 1:
                                            if (!(_i < arr_1.length)) return [3 /*break*/, 4];
                                            story = arr_1[_i];
                                            return [4 /*yield*/, page.screenshot(story)];
                                        case 2:
                                            _a.sent();
                                            this.terminal.progressTick();
                                            _a.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        this.terminal.progressStop();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.teardown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var outputDir, takedStories, skippedStories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.terminal
                            .section('cyan', constants_1.PhaseTypes.DONE, 'Screenshot image saving is completed!')
                            .blank();
                        outputDir = this.options.outputDir;
                        takedStories = this.store.get(false);
                        skippedStories = this.store.get(true);
                        takedStories.forEach(function (_a) {
                            var filename = _a.filename;
                            _this.terminal.echo("  " + logSymbols.success + "  " + outputDir + "/" + chalk_1.default.bold(filename));
                        });
                        skippedStories.forEach(function (_a) {
                            var filename = _a.filename;
                            _this.terminal.echo("  " + logSymbols.warning + "  " + outputDir + "/" + chalk_1.default.bold(filename) + " " + chalk_1.default.yellow('(skipped)'));
                        });
                        this.terminal
                            .blank(1)
                            .echo(chalk_1.default.bold('Time') + ":        " + utils_1.humanizeDuration(Date.now() - this.startTime))
                            .echo(chalk_1.default.bold('Screenshots') + ": " + takedStories.length + " total (" + skippedStories.length + " skipped)")
                            .blank(2);
                        return [4 /*yield*/, this.terminate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.terminate = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (e) {
                            this.terminal.error("An unexpected error occurred, Please make sure message below\n" + e);
                        }
                        this.server.stop();
                        return [4 /*yield*/, this.browser.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=App.js.map
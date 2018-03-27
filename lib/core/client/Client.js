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
var constants_1 = require("../constants");
var Client = /** @class */ (function () {
    function Client(env, gateway, channel, api) {
        this.env = env;
        this.gateway = gateway;
        this.channel = channel;
        this.api = api;
    }
    Client.prototype.run = function () {
        var phase = this.env.getPhase();
        if (phase === '') {
            return;
        }
        try {
            switch (phase) {
                case constants_1.PhaseTypes.PREPARE:
                    this.prepare();
                    return;
                case constants_1.PhaseTypes.CAPTURE:
                    this.capture();
                    return;
                default:
                    throw new Error("An unknown phase called \"" + phase + "\" is being executed.");
            }
        }
        catch (e) {
            this.gateway.failure(e);
        }
    };
    Client.prototype.prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchTargetStories()];
                    case 1:
                        stories = _a.sent();
                        this.gateway.setStories(stories);
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.capture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.channel.on(constants_1.EventTypes.COMPONENT_READY, function (story) {
                    if (_this.env.getKind() === story.kind && _this.env.getStory() === story.story) {
                        _this.gateway.readyComponent();
                    }
                });
                this.api.selectStory(this.env.getKind(), this.env.getStory());
                return [2 /*return*/];
            });
        });
    };
    Client.prototype.searchTargetStories = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.channel.once('setStories', function (_a) {
                var stories = _a.stories;
                // flatten stories
                var list = stories.reduce(function (acc, cur) { return acc.concat(cur.stories.map(function (story) { return ({
                    kind: cur.kind,
                    story: story,
                }); })); }, []);
                // sequential promises
                list.reduce(function (acc, cur) { return acc
                    .then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.searchScreenshotWrappersByStory(cur.kind, cur.story)];
                            case 1:
                                res = _a.sent();
                                return [2 /*return*/, results.concat(res)];
                        }
                    });
                }); })
                    .catch(reject); }, Promise.resolve([])).then(function (results) {
                    resolve(results);
                });
                _this.channel.on(constants_1.EventTypes.COMPONENT_ERROR, reject);
            });
        });
    };
    /**
     * One story can have several usage of withScreenshot.
     * Using the events from teh ScreenshotWrapper we try to know about the wrappers
     * events are firing in this sequence. init, mount
     * If story doesn't have any withScreenshot wrappers, we handle it with FINISH_MOUNT event.
     * initScreenshot decorator must be added before the gloabl withScreenshot,
     * so the mount event of the wrapper element in initScreenshot will be fired after
     * the all mount events of the withScreenthot HOC
     *
     * Why we use 2 kind of events: init and mount?
     * we use 2 events, init and mount, because in this way
     * we can recognize when all wrappers are mounted.
     * Init events always fire before a mount events.
     * so when we handle first mount event we know the total count of the wrappers.
     */
    Client.prototype.searchScreenshotWrappersByStory = function (kind, story) {
        var _this = this;
        var inited = [];
        var mounted = [];
        var match = function (fn) { return function (ctx) {
            if (ctx.kind === kind && ctx.story === story) {
                fn(ctx);
            }
        }; };
        return new Promise(function (resolve) {
            var onInit = match(function (ctx) {
                inited.push(ctx);
            });
            var onMount = match(function (ctx) {
                mounted.push(ctx);
                if (mounted.length === inited.length) {
                    doResolve(mounted);
                }
            });
            var onFinishMount = match(function (ctx) {
                if (inited.length === 0) {
                    doResolve([]);
                }
            });
            var doResolve = function (stories) {
                _this.channel.removeListener(constants_1.EventTypes.COMPONENT_INIT, onInit);
                _this.channel.removeListener(constants_1.EventTypes.COMPONENT_MOUNT, onMount);
                _this.channel.removeListener(constants_1.EventTypes.COMPONENT_FINISH_MOUNT, onFinishMount);
                resolve(stories);
            };
            _this.channel.on(constants_1.EventTypes.COMPONENT_INIT, onInit);
            _this.channel.on(constants_1.EventTypes.COMPONENT_MOUNT, onMount);
            _this.channel.on(constants_1.EventTypes.COMPONENT_FINISH_MOUNT, onFinishMount);
            _this.api.selectStory(kind, story);
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=Client.js.map
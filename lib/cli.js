#!/usr/bin/env node
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
require("babel-polyfill");
var utils_1 = require("./core/utils");
var _1 = require("./core/app/");
var program = require("commander");
var isCI = require("is-ci");
var pkg = require('../package.json');
/* tslint:disable:max-line-length */
program
    .version(pkg.version)
    .usage('[options]')
    .option('-p, --port [number]', 'Storybook server port.', utils_1.parser.identity, 9001)
    .option('-h, --host [string]', 'Storybook server host.', utils_1.parser.identity, 'localhost')
    .option('-s, --static-dir <dir-names>', 'Directory where to load static files from.', utils_1.parser.list)
    .option('-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from.', utils_1.parser.identity, '.storybook')
    .option('-o, --output-dir [dir-name]', 'Directory where screenshot images are saved.', utils_1.parser.identity, '__screenshots__')
    .option('--parallel [number]', 'Number of Page Instances of Puppeteer to be activated when shooting screenshots.', utils_1.parser.number, 4)
    .option('--filter-kind [regexp]', 'Filter of kind with RegExp. (example: "Button$")', utils_1.parser.regexp)
    .option('--filter-story [regexp]', 'Filter of story with RegExp. (example: "^with\\s.+$")', utils_1.parser.regexp)
    .option('--inject-files <file-names>', 'Path to the JavaScript file to be injected into frame.', utils_1.parser.list, [])
    .option('--browser-timeout [number]', 'Timeout milliseconds when Puppeteer opens Storybook.', utils_1.parser.number, 30000)
    .option('--silent', 'Suppress standard output.', utils_1.parser.identity, false)
    .option('--debug', 'Enable debug mode.', utils_1.parser.identity, false)
    .parse(process.argv);
/* tslint:enable */
var bin = child_process_1.execSync('echo $(npm bin)', { encoding: 'utf-8' })
    .toString()
    .trim();
var options = {
    port: program.port,
    host: program.host,
    staticDir: program.staticDir,
    configDir: program.configDir,
    outputDir: program.outputDir,
    filterKind: program.filterKind,
    filterStory: program.filterStory,
    browserTimeout: program.browserTimeout,
    parallel: program.parallel,
    injectFiles: program.injectFiles,
    silent: !!program.silent,
    debug: !!program.debug,
    ciMode: isCI,
    cwd: path.resolve(bin, '..', '..'),
    cmd: path.resolve(bin, 'start-storybook'),
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var store, terminal, app, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                store = new _1.StoryStore(options.filterKind, options.filterStory);
                terminal = new _1.Terminal(process.stdout, process.stderr, options.silent, options.debug, options.ciMode);
                app = new _1.App(options, store, terminal, new _1.Server(options, terminal, child_process_1.spawn), new _1.Browser(store, options));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, app.validate()];
            case 2:
                _a.sent();
                return [4 /*yield*/, app.launch()];
            case 3:
                _a.sent();
                return [4 /*yield*/, app.prepare()];
            case 4:
                _a.sent();
                return [4 /*yield*/, app.capture()];
            case 5:
                _a.sent();
                return [4 /*yield*/, app.teardown()];
            case 6:
                _a.sent();
                process.exit(0);
                return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                app.terminate(e_1);
                process.exit(1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=cli.js.map
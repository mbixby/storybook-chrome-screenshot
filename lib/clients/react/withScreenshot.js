"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var addons_1 = require("@storybook/addons");
var inspect = require("util-inspect");
var screenshot_options_1 = require("../../screenshot-options");
var ScreenshotWrapper_1 = require("./components/ScreenshotWrapper");
var constants_1 = require("../../core/constants");
var withScreenshot = function (options) {
    if (options === void 0) { options = {}; }
    return function (storyFn, ctx) {
        var channel = addons_1.default.getChannel();
        var wrapperWithContext = function (context) {
            var props = __assign({}, screenshot_options_1.mergeScreenshotOptions(options), { channel: channel,
                context: context });
            return (React.createElement(ScreenshotWrapper_1.default, __assign({}, props), storyFn(context)));
        };
        if (typeof storyFn !== 'function') {
            var msg = "The story may not be correct, (storyFn = \"" + inspect(storyFn) + "\")";
            channel.emit(constants_1.EventTypes.COMPONENT_ERROR, msg); // For puppeteer
            throw new Error(msg); // For browser
        }
        if (ctx) {
            return wrapperWithContext(ctx);
        }
        return function (context) { return (wrapperWithContext(context)); };
    };
};
exports.default = withScreenshot;
//# sourceMappingURL=withScreenshot.js.map
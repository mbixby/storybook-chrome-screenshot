"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var addons_1 = require("@storybook/addons");
var InitScreenshotWrapper_1 = require("./components/InitScreenshotWrapper");
var initScreenshot = function () { return function (storyFn, ctx) { return (React.createElement(InitScreenshotWrapper_1.default, { channel: addons_1.default.getChannel(), context: ctx }, storyFn())); }; };
exports.default = initScreenshot;
//# sourceMappingURL=initScreenshot.js.map
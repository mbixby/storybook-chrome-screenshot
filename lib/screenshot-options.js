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
var _ = require("lodash");
var constants_1 = require("./core/constants");
var opts = _.merge({}, constants_1.defaultScreenshotOptions);
exports.getScreenshotOptions = function () { return (opts); };
exports.mergeScreenshotOptions = function (options) {
    var viewport = {};
    if (Array.isArray(options.viewport)) {
        var base_1 = !Array.isArray(opts.viewport) ? opts.viewport : constants_1.defaultScreenshotOptions.viewport;
        viewport = options.viewport.map(function (vp) { return _.merge({}, base_1, vp); });
    }
    else {
        viewport = _.merge({}, (options.viewport || {}));
    }
    return _.merge({}, opts, __assign({}, options, { viewport: viewport }));
};
exports.setScreenshotOptions = function (options) {
    opts = exports.mergeScreenshotOptions(options);
};
//# sourceMappingURL=screenshot-options.js.map
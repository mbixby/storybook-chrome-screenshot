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
var addons_1 = require("@storybook/addons");
var constants_1 = require("../../core/constants");
var hoc_1 = require("./hoc");
var initScreenshot = function () { return function (getStory, ctx) {
    var component = getStory(ctx);
    return hoc_1.hoc(component, {
        mounted: function () {
            addons_1.default.getChannel().emit(constants_1.EventTypes.COMPONENT_FINISH_MOUNT, __assign({}, ctx));
        },
    });
}; };
exports.default = initScreenshot;
//# sourceMappingURL=initScreenshot.js.map
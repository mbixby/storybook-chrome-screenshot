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
var initScreenshot = function () { return function (getStory, ctx) {
    var story = getStory(ctx);
    if (story.component) {
        var clazz_1 = story.component.prototype;
        clazz_1.__getStoryContext__ = function () { return ctx; };
        if (!clazz_1.__WRAPPED_INIT_SCREENSHOT__) {
            var delegateAfterViewInit_1 = clazz_1.ngAfterViewInit || (function () { }); // tslint:disable-line:no-empty
            clazz_1.ngAfterViewInit = function afterViewInit() {
                delegateAfterViewInit_1.call(this);
                addons_1.default.getChannel().emit(constants_1.EventTypes.COMPONENT_FINISH_MOUNT, __assign({}, this.__getStoryContext__()));
                clazz_1.__WRAPPED_INIT_SCREENSHOT__ = true;
            };
        }
    }
    return story;
}; };
exports.default = initScreenshot;
//# sourceMappingURL=initScreenshot.js.map
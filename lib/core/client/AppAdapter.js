"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppAdapter = /** @class */ (function () {
    function AppAdapter() {
    }
    AppAdapter.prototype.readyComponentScreenshot = function () {
        window.readyComponentScreenshot();
    };
    AppAdapter.prototype.getScreenshotStories = function () {
        return window.getScreenshotStories();
    };
    AppAdapter.prototype.setScreenshotStories = function (stories) {
        window.setScreenshotStories(stories);
    };
    AppAdapter.prototype.failureScreenshot = function (err) {
        window.failureScreenshot(err);
    };
    return AppAdapter;
}());
exports.default = AppAdapter;
//# sourceMappingURL=AppAdapter.js.map
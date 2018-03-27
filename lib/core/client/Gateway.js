"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gateway = /** @class */ (function () {
    function Gateway(adapter) {
        this.adapter = adapter;
    }
    Gateway.prototype.readyComponent = function () {
        return this.adapter.readyComponentScreenshot();
    };
    Gateway.prototype.getStories = function () {
        return this.adapter.getScreenshotStories();
    };
    Gateway.prototype.setStories = function (stories) {
        return this.adapter.setScreenshotStories(stories);
    };
    Gateway.prototype.failure = function (err) {
        return this.adapter.failureScreenshot(err instanceof Error ? err.message : err);
    };
    return Gateway;
}());
exports.default = Gateway;
//# sourceMappingURL=Gateway.js.map
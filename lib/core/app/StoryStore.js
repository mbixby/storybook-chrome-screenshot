"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var StoryStore = /** @class */ (function () {
    function StoryStore(filterKind, filterStory) {
        this.stories = [];
        this.filterKind = filterKind;
        this.filterStory = filterStory;
    }
    StoryStore.prototype.set = function (stories) {
        var _this = this;
        this.stories = [];
        stories.forEach(function (story) {
            var skipped = !!((_this.filterKind && !_this.filterKind.test(story.kind)) ||
                (_this.filterStory && !_this.filterStory.test(story.story)));
            var isMultipleViewport = Array.isArray(story.viewport);
            var viewports = isMultipleViewport
                ? story.viewport
                : [story.viewport];
            viewports.forEach(function (viewport) {
                _this.stories.push({
                    kind: story.kind,
                    story: story.story,
                    viewport: viewport,
                    skipped: skipped,
                    filename: utils_1.story2filename(story.kind, story.story, isMultipleViewport ? viewport : null, story.namespace),
                });
            });
        });
    };
    StoryStore.prototype.get = function (skipped) {
        if (skipped === void 0) { skipped = false; }
        return this.stories.filter(function (story) { return story.skipped === skipped; });
    };
    return StoryStore;
}());
exports.default = StoryStore;
//# sourceMappingURL=StoryStore.js.map
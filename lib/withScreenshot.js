"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./core/utils");
var withScreenshot_1 = require("./clients/react/withScreenshot");
var withScreenshot_2 = require("./clients/angular/withScreenshot");
var withScreenshot_3 = require("./clients/vue/withScreenshot");
var storybookEnv = utils_1.getStorybookEnv();
var withScreenshot;
switch (storybookEnv) {
    case 'react':
        withScreenshot = withScreenshot_1.default;
        break;
    case 'angular':
        withScreenshot = withScreenshot_2.default;
        break;
    case 'vue':
        withScreenshot = withScreenshot_3.default;
        break;
    default:
        throw new Error("storybook-chrome-screenshot does not support \"" + storybookEnv + "\".");
}
exports.default = withScreenshot;
//# sourceMappingURL=withScreenshot.js.map
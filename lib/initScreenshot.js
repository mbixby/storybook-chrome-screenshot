"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./core/utils");
var initScreenshot_1 = require("./clients/react/initScreenshot");
var initScreenshot_2 = require("./clients/angular/initScreenshot");
var initScreenshot_3 = require("./clients/vue/initScreenshot");
var storybookEnv = utils_1.getStorybookEnv();
var initScreenshot;
switch (storybookEnv) {
    case 'react':
        initScreenshot = initScreenshot_1.default;
        break;
    case 'angular':
        initScreenshot = initScreenshot_2.default;
        break;
    case 'vue':
        initScreenshot = initScreenshot_3.default;
        break;
    default:
        throw new Error("storybook-chrome-screenshot does not support \"" + storybookEnv + "\".");
}
exports.default = initScreenshot;
//# sourceMappingURL=initScreenshot.js.map
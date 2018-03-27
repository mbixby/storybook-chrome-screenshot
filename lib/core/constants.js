"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhaseIdentity = 'chrome-screenshot';
exports.PhaseTypes = {
    LAUNCH: 'LAUNCH',
    PREPARE: 'PREPARE',
    CAPTURE: 'CAPTURE',
    DONE: 'DONE',
};
var prefix = exports.PhaseIdentity;
exports.EventTypes = {
    COMPONENT_INIT: prefix + "/component-init",
    COMPONENT_MOUNT: prefix + "/component-mount",
    COMPONENT_READY: prefix + "/component-ready",
    COMPONENT_ERROR: prefix + "/component-error",
    COMPONENT_FINISH_MOUNT: prefix + "/component-finish-mount",
    READY: prefix + "/ready",
};
exports.defaultScreenshotOptions = {
    delay: 0,
    viewport: {
        width: 1024,
        height: 768,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false,
    },
};
//# sourceMappingURL=constants.js.map
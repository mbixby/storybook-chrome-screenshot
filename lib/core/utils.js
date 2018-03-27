"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var sanitize = require("sanitize-filename");
exports.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.parser = {
    identity: function (v) { return v; },
    number: function (v) { return v ? parseInt(v, 10) : 0; },
    list: function (v) { return v ? v.split(',').map(function (o) { return o.trim(); }) : null; },
    regexp: function (v) { return v ? new RegExp(v) : null; },
};
exports.filenamify = function (filename) { return (sanitize(filename.trim())
    .replace(/\s{2,}/g, ' ')
    .replace(/\s/g, '-')); };
exports.viewport2string = function (viewport) { return ([
    viewport.width + "x" + viewport.height,
    "" + (viewport.isMobile ? '-mobile' : ''),
    "" + (viewport.hasTouch ? '-touch' : ''),
    "" + (viewport.isLandscape ? '-landscape' : ''),
    "" + (viewport.deviceScaleFactor > 1 ? "@" + viewport.deviceScaleFactor + "x" : ''),
].join('')); };
exports.story2filename = function (kind, story, vp, ns) { return (exports.filenamify(kind + "-" + story + (ns ? "_" + ns : '') + (vp ? "-" + exports.viewport2string(vp) : '')) + ".png"); };
exports.pascalize = function (v) { return ("" + v.charAt(0).toUpperCase() + _.camelCase(v.slice(1))); };
var Time = {
    MINUTES: 1000 * 60,
    SECONDS: 1000,
};
exports.humanizeDuration = function (timestamp) {
    var arr = [];
    var ts = timestamp;
    if (timestamp > Time.MINUTES) {
        var min = Math.floor(ts / Time.MINUTES);
        ts = ts - (min * Time.MINUTES);
        arr.push(min + "min");
    }
    var sec = (ts / Time.SECONDS)
        .toString()
        .split('.')
        .map(function (s) { return s.slice(0, 2); })
        .join('.');
    arr.push(sec + "s");
    return arr.join(' ');
};
exports.createArray = function (length) { return ((new Array(length)).fill(null)); };
exports.getStorybookEnv = function () { return (window.STORYBOOK_ENV // tslint:disable-line:no-any
); };
//# sourceMappingURL=utils.js.map
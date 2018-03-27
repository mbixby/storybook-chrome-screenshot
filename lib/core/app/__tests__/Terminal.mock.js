"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Terminal_1 = require("../Terminal");
var MockWriter = /** @class */ (function () {
    function MockWriter() {
        this.list = [];
    }
    MockWriter.prototype.write = function (msg) {
        this.list.push(msg);
        return true;
    };
    MockWriter.prototype.clear = function () {
        this.list = [];
    };
    return MockWriter;
}());
exports.MockWriter = MockWriter;
exports.factory = function (silent, debug, ciMode) {
    if (ciMode === void 0) { ciMode = false; }
    var stdout = new MockWriter();
    var stderr = new MockWriter();
    return {
        stdout: stdout,
        stderr: stderr,
        term: new Terminal_1.default(stdout, stderr, silent, debug, ciMode),
        clear: function () {
            stdout.clear();
            stderr.clear();
        },
    };
};
//# sourceMappingURL=Terminal.mock.js.map
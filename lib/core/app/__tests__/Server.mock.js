"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var MockReadableStream = /** @class */ (function (_super) {
    __extends(MockReadableStream, _super);
    function MockReadableStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockReadableStream;
}(events_1.EventEmitter));
exports.MockReadableStream = MockReadableStream;
var MockChildProcess = /** @class */ (function (_super) {
    __extends(MockChildProcess, _super);
    function MockChildProcess() {
        var _this = _super.call(this) || this;
        _this.killed = false;
        _this.stdout = new MockReadableStream();
        _this.stderr = new MockReadableStream();
        return _this;
    }
    MockChildProcess.prototype.kill = function (signal) {
        this.killed = true;
    };
    return MockChildProcess;
}(events_1.EventEmitter));
exports.MockChildProcess = MockChildProcess;
//# sourceMappingURL=Server.mock.js.map
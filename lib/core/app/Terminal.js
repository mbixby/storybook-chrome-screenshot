"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var chalk_1 = require("chalk");
var ProgressBar = require("progress");
var utils_1 = require("../utils");
var Terminal = /** @class */ (function () {
    function Terminal(stdout, stderr, silent, debug, ciMode) {
        this.progressCounter = null;
        this.stdout = stdout;
        this.stderr = stderr;
        this.silent = silent;
        this.debug = debug;
        this.ciMode = ciMode;
    }
    Terminal.prototype.echo = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.silent) {
            this.stdout.write(args.join(' ') + "\n");
        }
        return this;
    };
    Terminal.prototype.log = function (title) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.debug) {
            this.echo.apply(this, [this.createTitle('blue', 'DEBUG'),
                chalk_1.default.blue("[" + title + "]")].concat(args));
        }
        return this;
    };
    Terminal.prototype.section = function (color, title, message) {
        this.clear();
        this.echo(this.createTitle(color, title) + " " + message);
        return this;
    };
    Terminal.prototype.blank = function (repeat) {
        if (repeat === void 0) { repeat = 1; }
        for (var i = 0; i < repeat; i += 1) {
            this.echo();
        }
        return this;
    };
    Terminal.prototype.clear = function () {
        if (!this.silent && !this.debug && !this.ciMode) {
            this.stdout.write('\x1b[2J');
            this.stdout.write('\x1b[0f');
        }
        else if (this.debug) {
            this.blank(2);
        }
        return this;
    };
    Terminal.prototype.error = function (message) {
        this.stderr.write("\n\n" + this.createTitle('red', 'ERROR') + " " + message + "\n\n");
        return this;
    };
    Terminal.prototype.progressStart = function (format, total) {
        if (!this.silent) {
            if (this.ciMode) {
                this.progressCounter = {
                    current: 0,
                    total: total,
                };
            }
            else if (!this.debug) {
                this.progressbar = new ProgressBar(format, {
                    complete: '=',
                    incomplete: ' ',
                    width: 40,
                    total: total,
                });
            }
        }
        return this.progressRender();
    };
    Terminal.prototype.progressStop = function () {
        if (this.progressCounter) {
            this.progressCounter = null;
        }
        else if (this.progressbar) {
            this.progressbar.terminate();
        }
        return this;
    };
    Terminal.prototype.progressTick = function () {
        if (this.progressCounter) {
            this.progressCounter.current += 1;
            this.progressRender();
        }
        else if (this.progressbar) {
            this.progressbar.tick();
        }
        return this;
    };
    Terminal.prototype.progressRender = function () {
        if (this.progressCounter) {
            var _a = this.progressCounter, current = _a.current, total = _a.total;
            var paddedCurrent = _.padStart("" + current, ("" + total).length, ' ');
            this.stdout.write("  " + paddedCurrent + "/" + total + " (" + Math.round((current / total) * 100) + " %)\n");
        }
        else if (this.progressbar) {
            this.progressbar.render();
        }
        return this;
    };
    Terminal.prototype.createTitle = function (color, title) {
        return chalk_1.default.black["bg" + utils_1.pascalize(color)](" " + title + " ");
    };
    return Terminal;
}());
exports.default = Terminal;
//# sourceMappingURL=Terminal.js.map
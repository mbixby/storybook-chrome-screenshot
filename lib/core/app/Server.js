"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server = /** @class */ (function () {
    function Server(options, terminal, spawn) {
        this.url = null;
        this.proc = null;
        this.options = options;
        this.terminal = terminal;
        this.spawn = spawn;
    }
    Server.optionsToCommandArgs = function (options) {
        var args = [
            '-p', options.port.toString(),
            '-c', options.configDir,
        ];
        if (options.host) {
            args.push('-h', options.host);
        }
        if (options.staticDir) {
            args.push('-s', options.staticDir);
        }
        return args;
    };
    Server.matchServerURL = function (buffer) {
        var str = buffer.toString().trim();
        var m = str.match(/Storybook started on => (https?:\/\/.+)/);
        if (!m) {
            return null;
        }
        return m[1];
    };
    Server.prototype.start = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a = _this.options, cwd = _a.cwd, cmd = _a.cmd;
            var args = Server.optionsToCommandArgs(_this.options);
            var proc = _this.spawn(cmd, args, { cwd: cwd });
            var assignAndResolveIfNeeded = function (buf) {
                var url = Server.matchServerURL(buf);
                if (url) {
                    _this.url = url;
                    _this.proc = proc;
                    _this.terminal.log('Storybook URL', url);
                    resolve();
                }
            };
            _this.terminal.log('Command Arguments', args.join(' '));
            proc.stdout.on('data', function (buf) {
                _this.terminal.log('STDOUT', buf.toString().trim());
                assignAndResolveIfNeeded(buf);
            });
            proc.stderr.on('data', function (buf) {
                _this.terminal.log('STDERR', buf.toString().trim());
                assignAndResolveIfNeeded(buf);
            });
            proc.on('error', function (err) {
                reject(err.message);
            });
        });
    };
    Server.prototype.getURL = function () {
        return this.url || '';
    };
    Server.prototype.stop = function () {
        if (this.proc !== null && !this.proc.killed) {
            this.proc.kill();
        }
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=Server.js.map
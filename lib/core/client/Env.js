"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("query-string");
var constants_1 = require("../constants");
var Env = /** @class */ (function () {
    function Env(storybookEnv, queryString) {
        this.storybookEnv = storybookEnv;
        var query = qs.parse(queryString);
        this.phase = query[constants_1.PhaseIdentity];
        this.kind = query.selectKind;
        this.story = query.selectStory;
    }
    Env.prototype.getStorybookEnv = function () {
        return this.storybookEnv || 'react';
    };
    Env.prototype.getPhase = function () {
        return this.phase || '';
    };
    Env.prototype.getKind = function () {
        return this.kind || '';
    };
    Env.prototype.getStory = function () {
        return this.story || '';
    };
    return Env;
}());
exports.default = Env;
//# sourceMappingURL=Env.js.map
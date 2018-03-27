"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var Env_1 = require("../Env");
describe('Env', function () {
    it('Should be get environment variables', function () {
        var env;
        env = new Env_1.default('react', '?');
        expect(env.getStorybookEnv()).toBe('react');
        expect(env.getPhase()).toBe('');
        expect(env.getKind()).toBe('');
        expect(env.getStory()).toBe('');
        env = new Env_1.default('angular', "?" + constants_1.PhaseIdentity + "=foo&selectKind=kind&selectStory=story");
        expect(env.getStorybookEnv()).toBe('angular');
        expect(env.getPhase()).toBe('foo');
        expect(env.getKind()).toBe('kind');
        expect(env.getStory()).toBe('story');
    });
});
//# sourceMappingURL=Env.test.js.map
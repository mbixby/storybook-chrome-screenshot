"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var screenshot_options_1 = require("../screenshot-options");
var constants_1 = require("../core/constants");
var defaults = _.merge({}, constants_1.defaultScreenshotOptions);
describe('Screenshot Options', function () {
    it('mergeScreenshotOptions()', function () {
        var table = [
            [
                {},
                _.merge({}, defaults),
            ],
            [
                {
                    namespace: 'foo',
                },
                _.merge({}, defaults, {
                    namespace: 'foo',
                }),
            ],
            [
                {
                    viewport: {
                        width: 100,
                        height: 1000,
                    },
                },
                _.merge({}, defaults, {
                    viewport: _.merge({}, defaults.viewport, {
                        width: 100,
                        height: 1000,
                    }),
                }),
            ],
        ];
        for (var _i = 0, table_1 = table; _i < table_1.length; _i++) {
            var _a = table_1[_i], opts = _a[0], o = _a[1];
            expect(screenshot_options_1.mergeScreenshotOptions(opts)).toEqual(o);
        }
    });
});
//# sourceMappingURL=screenshot-options.test.js.map
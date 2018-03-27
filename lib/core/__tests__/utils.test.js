"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
var utils = require("../utils");
describe('Utilities', function () {
    it('filenamify()', function () {
        var table = [
            ['foo bar baz', 'foo-bar-baz'],
            ['foo    bar', 'foo-bar'],
            ['foo_bar/baz', 'foo_barbaz'],
        ];
        for (var _i = 0, table_1 = table; _i < table_1.length; _i++) {
            var _a = table_1[_i], s = _a[0], o = _a[1];
            expect(utils.filenamify(s)).toBe(o);
        }
    });
    it('viewport2string()', function () {
        var vp = {
            width: 900,
            height: 400,
            isMobile: false,
            hasTouch: false,
            isLandscape: false,
            deviceScaleFactor: 1,
        };
        var table = [
            [
                __assign({}, vp),
                '900x400',
            ],
            [
                __assign({}, vp, { width: 100, height: 200 }),
                '100x200',
            ],
            [
                __assign({}, vp, { isMobile: true, hasTouch: true, isLandscape: true, deviceScaleFactor: 2 }),
                '900x400-mobile-touch-landscape@2x',
            ],
        ];
        for (var _i = 0, table_2 = table; _i < table_2.length; _i++) {
            var _a = table_2[_i], v = _a[0], o = _a[1];
            expect(utils.viewport2string(v)).toBe(o);
        }
    });
    it('story2filename', function () {
        var table = [
            [
                [
                    'Kind',
                    'Story',
                    null,
                    null,
                ],
                'Kind-Story.png',
            ],
            [
                [
                    'foo',
                    'bar',
                    {
                        width: 100,
                        height: 200,
                        isMobile: false,
                        hasTouch: false,
                        isLandscape: false,
                        deviceScaleFactor: 2,
                    },
                    null,
                ],
                'foo-bar-100x200@2x.png',
            ],
            [
                [
                    'foo',
                    'bar',
                    {
                        width: 1,
                        height: 2,
                        isMobile: false,
                        hasTouch: false,
                        isLandscape: false,
                        deviceScaleFactor: 1,
                    },
                    'baz',
                ],
                'foo-bar_baz-1x2.png',
            ],
        ];
        for (var _i = 0, table_3 = table; _i < table_3.length; _i++) {
            var _a = table_3[_i], _b = _a[0], kind = _b[0], story = _b[1], vp = _b[2], ns = _b[3], o = _a[1];
            expect(utils.story2filename(kind, story, vp, ns)).toBe(o);
        }
    });
    it('pascalize()', function () {
        var table = [
            ['camelCase', 'CamelCase'],
            ['foo_bar_baz', 'FooBarBaz'],
            ['foo bar baz', 'FooBarBaz'],
        ];
        for (var _i = 0, table_4 = table; _i < table_4.length; _i++) {
            var _a = table_4[_i], s = _a[0], o = _a[1];
            expect(utils.pascalize(s)).toBe(o);
        }
    });
    it('humanizeDuration()', function () {
        var table = [
            [
                1000,
                '1s',
            ],
            [
                2100,
                '2.1s',
            ],
            [
                5111,
                '5.11s',
            ],
            [
                1 * 1000 * 60 + 2000,
                '1min 2s',
            ],
            [
                19 * 1000 * 60 + 5610,
                '19min 5.61s',
            ],
        ];
        for (var _i = 0, table_5 = table; _i < table_5.length; _i++) {
            var _a = table_5[_i], n = _a[0], o = _a[1];
            expect(utils.humanizeDuration(n)).toBe(o);
        }
    });
    it('getStorybookEnv()', function () {
        window.STORYBOOK_ENV = 'react';
        expect(utils.getStorybookEnv()).toBe('react');
        window.STORYBOOK_ENV = 'angular';
        expect(utils.getStorybookEnv()).toBe('angular');
    });
});
//# sourceMappingURL=utils.test.js.map
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
// FIXME
// As you can see, we are using any, so type definition is not performed properly.
// How is it to be better to solve it?
/* tslint:disable:no-any */
exports.hoc = function (component, wrap) { return (__assign({}, wrap, { render: function (h, context) {
        var self = this;
        return h(component, {
            attrs: self.$attrs,
            props: self.$props,
            on: self.$listeners,
            scopedSlots: self.$scopedSlots,
        }, self.$slots);
    } })); };
//# sourceMappingURL=hoc.js.map
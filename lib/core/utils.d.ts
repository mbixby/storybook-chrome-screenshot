import { Viewport } from '../models/viewport';
import { StorybookEnv } from '../models/storybook';
export declare const sleep: (ms: number) => Promise<{}>;
export declare const parser: {
    identity: (v: string | undefined) => string | undefined;
    number: (v: string | undefined) => number;
    list: (v: string | undefined) => string[] | null;
    regexp: (v: string | undefined) => RegExp | null;
};
export declare const filenamify: (filename: string) => string;
export declare const viewport2string: (viewport: Viewport) => string;
export declare const story2filename: (kind: string, story: string, vp: Viewport | null, ns: string | null) => string;
export declare const pascalize: (v: string) => string;
export declare const humanizeDuration: (timestamp: number) => string;
export declare const createArray: (length: number) => any[];
export declare const getStorybookEnv: () => StorybookEnv;

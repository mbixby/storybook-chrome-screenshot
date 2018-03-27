import { PartialScreenshotOptions, ScreenshotOptions } from './models/options';
export declare const getScreenshotOptions: () => ScreenshotOptions;
export declare const mergeScreenshotOptions: (options: PartialScreenshotOptions) => ScreenshotOptions;
export declare const setScreenshotOptions: (options: Partial<ScreenshotOptions>) => void;

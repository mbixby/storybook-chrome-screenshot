import { ScreenshotOptions } from '../models/options';
export declare const PhaseIdentity = "chrome-screenshot";
export declare const PhaseTypes: {
    LAUNCH: string;
    PREPARE: string;
    CAPTURE: string;
    DONE: string;
};
export declare const EventTypes: {
    COMPONENT_INIT: string;
    COMPONENT_MOUNT: string;
    COMPONENT_READY: string;
    COMPONENT_ERROR: string;
    COMPONENT_FINISH_MOUNT: string;
    READY: string;
};
export declare const defaultScreenshotOptions: ScreenshotOptions;

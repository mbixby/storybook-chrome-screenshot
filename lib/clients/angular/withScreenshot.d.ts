import { PartialScreenshotOptions } from '../../models/options';
import { NgStory } from './models';
declare const withScreenshot: (options?: PartialScreenshotOptions) => (getStory: () => NgStory) => () => NgStory;
export default withScreenshot;

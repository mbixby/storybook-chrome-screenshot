/// <reference types="react" />
import { PartialScreenshotOptions } from '../../models/options';
import { Story } from '../../models/story';
declare const withScreenshot: (options?: PartialScreenshotOptions) => (storyFn: Function, ctx: Story | undefined) => JSX.Element | ((context: Story) => JSX.Element);
export default withScreenshot;

import { PartialScreenshotOptions } from '../../models/options';
import { Story } from '../../models/story';
import { VueStory } from './models';
declare const withScreenshot: (options?: PartialScreenshotOptions) => (getStory: () => VueStory, ctx: Story | undefined) => any;
export default withScreenshot;

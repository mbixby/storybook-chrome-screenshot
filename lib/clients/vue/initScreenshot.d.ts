import { Story } from '../../models/story';
import { VueStory } from './models';
declare const initScreenshot: () => (getStory: (context: VueStory) => VueStory, ctx: Story) => any;
export default initScreenshot;

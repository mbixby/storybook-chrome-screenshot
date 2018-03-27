import { Story } from '../../models/story';
import { NgStory } from './models';
declare const initScreenshot: () => (getStory: (context: Story) => NgStory, ctx: Story) => NgStory;
export default initScreenshot;

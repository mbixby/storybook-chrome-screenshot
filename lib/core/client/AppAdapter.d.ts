import { StoryWithOptions, StoredStory } from '../../models/story';
export interface Adapter {
    readyComponentScreenshot(): void;
    getScreenshotStories(): StoredStory[];
    setScreenshotStories(stories: StoryWithOptions[]): void;
    failureScreenshot(err: string): void;
}
export default class AppAdapter implements Adapter {
    readyComponentScreenshot(): void;
    getScreenshotStories(): StoredStory[];
    setScreenshotStories(stories: StoryWithOptions[]): void;
    failureScreenshot(err: string): void;
}

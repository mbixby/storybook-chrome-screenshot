import { StoryWithOptions, StoredStory } from '../../models/story';
export default class StoryStore {
    private stories;
    private filterKind;
    private filterStory;
    constructor(filterKind: RegExp | undefined, filterStory: RegExp | undefined);
    set(stories: StoryWithOptions[]): void;
    get(skipped?: boolean): StoredStory[];
}

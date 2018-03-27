import { StorybookEnv } from '../../models/storybook';
export default class Env {
    private storybookEnv;
    private phase;
    private kind;
    private story;
    constructor(storybookEnv: StorybookEnv, queryString: string);
    getStorybookEnv(): StorybookEnv;
    getPhase(): string;
    getKind(): string;
    getStory(): string;
}

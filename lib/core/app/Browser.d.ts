import { CLIOptions } from '../../models/options';
import StoryStore from './StoryStore';
import Page, { ConsoleHandler } from './Page';
export default class Browser {
    private store;
    private options;
    private browser;
    constructor(store: StoryStore, options: CLIOptions);
    launch(): Promise<void>;
    close(): Promise<void>;
    createPages(url: string, consoleHandler: ConsoleHandler): Promise<Page[]>;
}

import { CLIOptions } from '../../models/options';
import StoryStore from './StoryStore';
import Terminal from './Terminal';
import Server from './Server';
import Browser from './Browser';
export default class App {
    private options;
    private store;
    private terminal;
    private server;
    private browser;
    private pages;
    private first;
    private startTime;
    constructor(options: CLIOptions, store: StoryStore, terminal: Terminal, server: Server, browser: Browser);
    validate(): Promise<void>;
    launch(): Promise<void>;
    prepare(): Promise<{}>;
    capture(): Promise<void>;
    teardown(): Promise<void>;
    terminate(e?: Error): Promise<void>;
}

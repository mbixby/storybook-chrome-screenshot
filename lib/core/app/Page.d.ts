/// <reference types="node" />
import { EventEmitter } from 'events';
import * as puppeteer from 'puppeteer';
import { StoryWithOptions, StoredStory } from '../../models/story';
import { CLIOptions } from '../../models/options';
export interface ConsoleHandler {
    (type: string, text: string): void;
}
export default class Page extends EventEmitter {
    private page;
    private url;
    private options;
    constructor(page: puppeteer.Page, url: string, options: CLIOptions, consoleHandler: ConsoleHandler);
    goto(phase: string, query?: object): Promise<puppeteer.Response | null>;
    screenshot(story: StoredStory): Promise<string>;
    exposeSetScreenshotStories(): Promise<void>;
    waitScreenshotStories(): Promise<StoryWithOptions[]>;
    exposeFunction(name: string, fn: (...args: any[]) => any): Promise<void>;
    private waitComponentReady();
}

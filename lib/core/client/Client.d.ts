import Env from './Env';
import Gateway from './Gateway';
import { Channel, API } from '../../models/storybook';
export default class Client {
    private env;
    private gateway;
    private channel;
    private api;
    constructor(env: Env, gateway: Gateway, channel: Channel, api: API);
    run(): void;
    private prepare();
    private capture();
    private searchTargetStories();
    /**
     * One story can have several usage of withScreenshot.
     * Using the events from teh ScreenshotWrapper we try to know about the wrappers
     * events are firing in this sequence. init, mount
     * If story doesn't have any withScreenshot wrappers, we handle it with FINISH_MOUNT event.
     * initScreenshot decorator must be added before the gloabl withScreenshot,
     * so the mount event of the wrapper element in initScreenshot will be fired after
     * the all mount events of the withScreenthot HOC
     *
     * Why we use 2 kind of events: init and mount?
     * we use 2 events, init and mount, because in this way
     * we can recognize when all wrappers are mounted.
     * Init events always fire before a mount events.
     * so when we handle first mount event we know the total count of the wrappers.
     */
    private searchScreenshotWrappersByStory(kind, story);
}

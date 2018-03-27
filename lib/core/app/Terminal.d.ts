import { Writer } from '../../models/terminal';
export default class Terminal {
    private stdout;
    private stderr;
    private silent;
    private debug;
    private ciMode;
    private progressCounter;
    private progressbar;
    constructor(stdout: Writer, stderr: Writer, silent: boolean, debug: boolean, ciMode: boolean);
    echo(...args: {}[]): this;
    log(title: string, ...args: {}[]): this;
    section(color: string, title: string, message: string): this;
    blank(repeat?: number): this;
    clear(): this;
    error(message: string): this;
    progressStart(format: string, total: number): this;
    progressStop(): this;
    progressTick(): this;
    private progressRender();
    private createTitle(color, title);
}

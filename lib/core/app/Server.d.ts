/// <reference types="node" />
import { SpawnOptions } from 'child_process';
import Terminal from './Terminal';
import { CLIOptions } from '../../models/options';
export interface ReadableStream {
    on(event: 'data', listener: (buf: string | Buffer) => void): this;
}
export interface ChildProcess {
    stdout: ReadableStream;
    stderr: ReadableStream;
    killed: boolean;
    kill(signal?: string): void;
    on(event: 'error', listener: (err: Error) => void): this;
}
export interface CommandExecutor {
    (command: string, args?: string[], options?: SpawnOptions): ChildProcess;
}
export default class Server {
    private options;
    private terminal;
    private spawn;
    private url;
    private proc;
    private static optionsToCommandArgs(options);
    private static matchServerURL(buffer);
    constructor(options: CLIOptions, terminal: Terminal, spawn: CommandExecutor);
    start(): Promise<{}>;
    getURL(): string;
    stop(): void;
}

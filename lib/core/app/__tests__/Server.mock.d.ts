/// <reference types="node" />
import { EventEmitter } from 'events';
import { ReadableStream, ChildProcess } from '../Server';
export declare class MockReadableStream extends EventEmitter implements ReadableStream {
}
export declare class MockChildProcess extends EventEmitter implements ChildProcess {
    stdout: MockReadableStream;
    stderr: MockReadableStream;
    killed: boolean;
    constructor();
    kill(signal?: string): void;
}

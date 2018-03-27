import Terminal from '../Terminal';
import { Writer } from '../../../models/terminal';
export declare class MockWriter implements Writer {
    list: string[];
    write(msg: string): boolean;
    clear(): void;
}
export declare const factory: (silent: boolean, debug: boolean, ciMode?: boolean) => {
    stdout: MockWriter;
    stderr: MockWriter;
    term: Terminal;
    clear: () => void;
};

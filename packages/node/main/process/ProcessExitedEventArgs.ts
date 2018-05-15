import {ExitCode} from './ExitCode';
import Signals = NodeJS.Signals;


export class ProcessExitedEventArgs {
    public readonly exitCode: ExitCode;
    public readonly signal: Signals | undefined;


    public constructor(exitCode: ExitCode, signal?: Signals) {
        this.exitCode = exitCode;
        this.signal = signal;

    }
}

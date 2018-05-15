import {ExitCode} from './ExitCode';
import Signals = NodeJS.Signals;


export class ProcessClosedEventArgs {
    public readonly exitCode: ExitCode;
    public readonly signal: NodeJS.Signals;


    public constructor(exitCode: ExitCode, signal: Signals) {
        this.exitCode = exitCode;
        this.signal = signal;

    }
}

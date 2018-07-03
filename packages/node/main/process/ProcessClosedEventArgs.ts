import {ExitCode} from './ExitCode';
import Signals = NodeJS.Signals;
import {EventArgs} from '@monument/core/main/events/EventArgs';


export class ProcessClosedEventArgs extends EventArgs {
    public readonly exitCode: ExitCode;
    public readonly signal: NodeJS.Signals;


    public constructor(exitCode: ExitCode, signal: Signals) {
        super();

        this.exitCode = exitCode;
        this.signal = signal;
    }
}

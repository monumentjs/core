import {CancellationToken} from './CancellationToken';


export interface Task {
    readonly isRunning: boolean;

    run(cancellationToken?: CancellationToken): Promise<void>;
}

import {CancellationToken} from './CancellationToken';


export type Runnable<TResult = void> = (cancellationToken: CancellationToken) => Promise<TResult>;


import {FileSystemWatcherState} from './FileSystemWatcherState';
import {Path} from '../../path/Path';


export interface FileSystemWatcher {
    readonly path: Path;
    readonly state: FileSystemWatcherState;
    readonly isPending: boolean;
    readonly isActive: boolean;
    readonly isStopped: boolean;
    readonly isBroken: boolean;

    watch(): void;
    stop(): void;
}

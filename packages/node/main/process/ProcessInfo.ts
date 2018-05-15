import {Path} from '../path/Path';


/**
 * Channel information.
 */
export interface ProcessInfo {
    readonly processId: number;
    readonly parentProcessId: number;
    readonly currentWorkingDirectory: Path;
    readonly userId: number | undefined;
    readonly groupId: number | undefined;
}

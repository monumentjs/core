
/**
 * Process information.
 */
export interface ProcessInfo {
    readonly processId: number;
    readonly parentProcessId: number;
    readonly currentWorkingDirectory: string;
    readonly userId?: number;
    readonly groupId?: number;
}

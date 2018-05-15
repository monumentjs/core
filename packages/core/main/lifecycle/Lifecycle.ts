

export interface Lifecycle {
    readonly isInitialized: boolean;
    readonly isStarting: boolean;
    readonly isStarted: boolean;
    readonly isStopping: boolean;
    readonly isStopped: boolean;

    initialize(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}

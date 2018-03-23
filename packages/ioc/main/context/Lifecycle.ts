

export interface Lifecycle {
    readonly isRunning: boolean;
    start(): Promise<void>;
    stop(): Promise<void>;
}

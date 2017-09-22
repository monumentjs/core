

export interface ILifecycle {
    readonly isRunning: boolean;

    start(): void;
    stop(): void;
}

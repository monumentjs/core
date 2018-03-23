

export interface Runnable<TResult = void> {
    run(): Promise<TResult>;
}

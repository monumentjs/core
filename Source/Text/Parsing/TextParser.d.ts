export declare abstract class TextParser<TState, TValue> {
    protected _state: TState;
    readonly state: TState;
    readonly abstract value: TValue;
    constructor();
    parse(sourceString: string): void;
    resetState(): void;
    protected abstract getInitialState(): TState;
    protected abstract reduce(currentChar: string, index: number): void;
}

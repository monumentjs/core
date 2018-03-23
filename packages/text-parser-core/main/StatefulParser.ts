

export interface StatefulParser<TResult> {
    readonly result: TResult;

    push(input: string): void;
}

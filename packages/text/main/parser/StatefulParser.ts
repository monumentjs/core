

export interface StatefulParser<TResult> {
    readonly result: TResult | undefined;

    push(input: string): void;
}

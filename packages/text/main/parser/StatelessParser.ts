

export interface StatelessParser<TResult> {
    parse(input: string): TResult;
}

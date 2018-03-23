

export interface Consumer<T> {
    /**
     * Performs this operation on the given argument.
     */
    accept(value: T): void;

    /**
     * Returns a composed Consumer that performs, in sequence, this operation followed by the after operation.
     * If performing either operation throws an exception, it is relayed to the caller of the composed operation.
     * If performing this operation throws an exception, the after operation will not be performed.
     * @returns a composed Consumer that performs in sequence this operation followed by the after operation
     */
    andThen(after: Consumer<T>): Consumer<T>;
}

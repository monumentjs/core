

export interface IStatePatch<TState> {
    apply(state: TState): void;
}

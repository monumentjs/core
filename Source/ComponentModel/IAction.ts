

export interface IAction<TState> {
    apply(state: TState): void;
}

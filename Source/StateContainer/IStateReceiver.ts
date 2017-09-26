

export interface IStateReceiver<TState> {
    setState(state: TState): void;
}

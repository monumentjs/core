

export interface IStateReceiver<TState> {
    receiveState(state: TState): void;
}

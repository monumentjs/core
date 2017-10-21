import {TextParserState} from './TextParserState';


export abstract class TextParser<TState extends TextParserState, TResult> {

    public parse(sourceString: string): TResult {
        const state: TState = this.getInitialState();

        for (let index = 0; index < sourceString.length; index++) {
            state.index = index;
            state.currentChar = sourceString[index];

            this.reduce(state);
        }

        return this.getResult(state);
    }


    protected abstract getInitialState(): TState;
    protected abstract reduce(state: TState): void;
    protected abstract getResult(state: TState): TResult;
}

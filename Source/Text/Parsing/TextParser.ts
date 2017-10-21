import {TextParserState} from './TextParserState';


export abstract class TextParser<TState extends TextParserState, TResult> {

    public parse(sourceString: string): TResult {
        const state: TState = this.getInitialState(sourceString);

        this.onBeforeParsing(state);

        for (let index = 0; index < sourceString.length; index++) {
            state.index = index;
            state.currentChar = sourceString[index];

            this.parseNext(state);
        }

        this.onAfterParsing(state);

        return this.getResult(state);
    }


    protected abstract getInitialState(sourceString: string): TState;
    protected abstract onBeforeParsing(state: TState): void;
    protected abstract parseNext(state: TState): void;
    protected abstract onAfterParsing(state: TState): void;
    protected abstract getResult(state: TState): TResult;
}

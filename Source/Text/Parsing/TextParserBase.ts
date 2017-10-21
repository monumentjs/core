import {TextParserState} from './TextParserState';


export abstract class TextParserBase<TState extends TextParserState, TResult> {

    public parse(sourceString: string): TResult {
        const state: TState = this.getInitialState(sourceString);

        this.onBeforeParsing(state);

        for (let index = 0; index < sourceString.length; index++) {
            state.index = index;
            state.currentChar = sourceString[index];

            this.parseNext(state);
        }

        this.onAfterParsing(state);

        return this.getResult();
    }


    protected abstract getInitialState(sourceString: string): TState;

    protected onBeforeParsing(state: TState): void {
        // Do nothing
    }

    protected abstract parseNext(state: TState): void;

    protected onAfterParsing(state: TState): void {
        // Do nothing
    }

    protected abstract getResult(): TResult;
}

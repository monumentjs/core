import {TextParserState} from './TextParserState';


export abstract class TextParserBase<TState extends TextParserState, TResult> {
    private _state: TState;


    public get state(): TState {
        return this._state;
    }


    public constructor() {
        this.reset();
    }


    public reset(): void {
        this._state = this.getInitialState();
    }


    public parse(sourceString: string): TResult {
        this.onBeforeParsing();

        for (let index = 0; index < sourceString.length; index++) {
            this.state.index = index;
            this.state.currentChar = sourceString[index];

            this.parseNext();
        }

        this.onAfterParsing();

        return this.getResult();
    }


    protected abstract getInitialState(): TState;

    protected onBeforeParsing(): void {
        // Do nothing
    }

    protected abstract parseNext(): void;

    protected onAfterParsing(): void {
        // Do nothing
    }

    protected abstract getResult(): TResult;
}

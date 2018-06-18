import {TextParserContext} from './TextParserContext';
import {StatefulParser} from './StatefulParser';


export abstract class AbstractStatefulParser<TState, TResult> implements StatefulParser<TResult> {
    private _state: TState;
    private _context: TextParserContext<TResult> = new TextParserContext();


    protected get state(): TState {
        return this._state;
    }


    protected get context(): TextParserContext<TResult> {
        return this._context;
    }


    public get result(): TResult | undefined {
        return this.context.result;
    }


    public constructor() {
        this._state = this.getInitialState();
    }


    public push(chunk: string): void {
        this.context.input = chunk;

        while (this.context.next()) {
            this.next();
        }
    }


    protected abstract getInitialState(): TState;


    protected abstract next(): void;
}

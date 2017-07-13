

import {Assert} from '../../Assertion/Assert';
export abstract class TextParser<TState, TValue> {
    protected _state: TState;
    
    
    public get state(): TState {
        return this._state;
    }
    
    
    public abstract get value(): TValue;


    public constructor() {
        this.resetState();
    }
    

    public parse(sourceString: string): void {
        Assert.argument('sourceString', sourceString).notNull();

        for (let index = 0; index < sourceString.length; index++) {
            let currentChar: string = sourceString[index];
            
            this.reduce(currentChar, index);
        }
    }


    public resetState(): void {
        this._state = this.getInitialState();
    }
    
 
    protected abstract getInitialState(): TState;
    protected abstract reduce(currentChar: string, index: number): void;
}

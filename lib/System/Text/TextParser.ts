

export abstract class TextParser<TState, TValue> {
    protected _state: TState;
    
    
    public get state(): TState {
        return this._state;
    }
    
    
    public abstract get value(): TValue;


    public constructor(initialState: TState) {
        this._state = initialState;
    }
    
    /**
     *
     * @param sourceString
     */
    public parse(sourceString: string): void {
        for (let index = 0; index < sourceString.length; index++) {
            let currentChar: string = sourceString[index];
            
            this.reduce(currentChar, index);
        }
    }
    
 
    protected abstract reduce(currentChar: string, index: number): void;
}

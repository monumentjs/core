import {TextParser} from '../../Text/TextParser';
import ArgumentsParserState from './ArgumentsParserState';
import Arguments from './Arguments';
import CommandOption from './CommandOption';


export default class ArgumentsParser extends TextParser<ArgumentsParserState, Arguments> {
    private _args: Arguments;
    private _slices: string[];
    
    
    public get value(): Arguments {
        return this._args;
    }
    
    
    public constructor() {
        super(new ArgumentsParserState());
    }
    
    
    public parse(argv: string): void {
        this._slices = [];
        this._args = new Arguments();
        
        super.parse(argv);
        
        this.updateState(' ');
        this.processSlices();
        
        this._state = new ArgumentsParserState();
    }
    
    
    protected reduce(currentChar: string): void {
        this.updateState(currentChar);
        this.state.previousChar = currentChar;
    }
    
    
    private updateState(currentChar: string): void {
        let state: ArgumentsParserState = this.state;
        let {isString, stringQuot, previousChar} = state;
    
        if (isString) {
            if (currentChar === stringQuot && previousChar !== '\\') {
                this.onStringEnd();
            } else {
                state.text += currentChar;
            }
        } else {
            if (currentChar === `"` || currentChar === `'`) {
                this.onStringStart(currentChar);
            } else if (currentChar === ' ') {
                this.onWordEnd(state);
            } else {
                state.text += currentChar;
            }
        }
    }
    
    
    private onWordEnd(state: ArgumentsParserState) {
        this.addSlice(state.text);
        state.text = '';
    }
    
    
    private onStringStart(currentChar: string): void {
        let state: ArgumentsParserState = this.state;
        
        state.isString = true;
        state.stringQuot = currentChar;
    }
    
    
    private onStringEnd(): void {
        let state: ArgumentsParserState = this.state;
        
        this.addSlice(state.text);
        
        state.isString = false;
        state.stringQuot = '';
        state.text = '';
    }
    
    
    private addSlice(slice: string): void {
        if (slice.length > 0) {
            this._slices.push(slice);
        }
    }
    
    
    private processSlices(): void {
        let [executablePath, mainModulePath, ...args] = this._slices;
        let lastOptionName: string;
        
        this._args.executablePath = executablePath;
        this._args.mainModulePath = mainModulePath;
        
        args.forEach((arg: string): void => {
            if (this.isOptionName(arg)) {
                if (lastOptionName) {
                    this._args.options.add(new CommandOption(lastOptionName, true));
                }
                
                lastOptionName = arg;
            } else {
                if (lastOptionName) {
                    this._args.options.add(new CommandOption(lastOptionName, arg));
                    lastOptionName = null;
                } else {
                    this._args.commands.add(arg);
                }
            }
        });
    }
    
    
    private isOptionName(arg: string): boolean {
        return arg[0] === '-';
    }
}

import {TextParser} from '../Text/TextParser';
import ArgumentsParserState from './ArgumentsParserState';
import Arguments from './Arguments';
import CommandOption from './CommandOption';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import InvalidOperationException from '../../Core/Exceptions/InvalidOperationException';
import Collection from '../../Core/Collections/Collection';


const SEGMENTS_DELIMITER_SIGN: string = ' ';
const QUOT_ESCAPE_SIGN: string = '\\';
const DOUBLE_QUOT_CHAR: string = `"`;
const SINGLE_QUOT_CHAR: string = `'`;
const EMPTY_STRING: string = '';


export default class ArgumentsParser extends TextParser<ArgumentsParserState, Arguments> {
    private _args: Arguments;
    private _segments: Collection<string>;
    
    
    public get value(): Arguments {
        if (this._args == null) {
            throw new InvalidOperationException(`Arguments parser haven't been initialized.`);
        }
        
        return this._args;
    }


    public parse(command: string): void {
        assertArgumentNotNull('command', command);

        this.resetSegments();
        this.resetArguments();

        super.parse(command);

        this.flushSegment();

        this.fillArguments();
        
        this.resetState();
    }


    protected getInitialState(): ArgumentsParserState {
        return new ArgumentsParserState();
    }
    
    
    protected reduce(currentChar: string): void {
        this.updateState(currentChar);
        this.state.previousChar = currentChar;
    }


    private resetSegments(): void {
        this._segments = new Collection<string>();
    }


    private resetArguments(): void {
        this._args = new Arguments();
    }

    
    private updateState(currentChar: string): void {
        let state: ArgumentsParserState = this.state;
        let {inQuotedSegment} = state;
    
        if (inQuotedSegment) {
            if (this.isTrailingQuot(currentChar)) {
                this.endQuotedSegment();
            } else {
                state.text += currentChar;
            }
        } else {
            if (this.isLeadingQuot(currentChar)) {
                this.beginQuotedSegment(currentChar);
            } else if (this.isSegmentDelimiter(currentChar)) {
                this.flushSegment();
            } else {
                state.text += currentChar;
            }
        }
    }
    

    private beginQuotedSegment(quotSign: string): void {
        let state: ArgumentsParserState = this.state;
        
        state.inQuotedSegment = true;
        state.quotSign = quotSign;
    }
    
    
    private endQuotedSegment(): void {
        let state: ArgumentsParserState = this.state;
        
        this.flushSegment();
        
        state.inQuotedSegment = false;
        state.quotSign = EMPTY_STRING;
    }


    private flushSegment(): void {
        let state: ArgumentsParserState = this.state;

        if (state.text.length > 0) {
            this._segments.add(state.text);
        }

        state.text = EMPTY_STRING;
    }
    
    
    private fillArguments(): void {
        let [executablePath, mainModulePath, ...segments] = this._segments.toArray();
        let lastOptionName: string;
        
        this._args.executablePath = executablePath;
        this._args.mainModulePath = mainModulePath;
        
        segments.forEach((segment: string): void => {
            if (this.isOptionName(segment)) {
                if (lastOptionName) {
                    this._args.options.add(new CommandOption(lastOptionName, true));
                }
                
                lastOptionName = segment;
            } else {
                if (lastOptionName) {
                    this._args.options.add(new CommandOption(lastOptionName, segment));
                    lastOptionName = null;
                } else {
                    this._args.commands.add(segment);
                }
            }
        });
    }


    private isLeadingQuot(currentChar: string): boolean {
        let {quotSign} = this.state;

        return quotSign === EMPTY_STRING && (currentChar === DOUBLE_QUOT_CHAR || currentChar === SINGLE_QUOT_CHAR);
    }


    private isTrailingQuot(currentChar: string): boolean {
        let {quotSign, previousChar} = this.state;

        return quotSign !== EMPTY_STRING && currentChar === quotSign && previousChar !== QUOT_ESCAPE_SIGN;
    }


    private isSegmentDelimiter(currentChar: string): boolean {
        return currentChar === SEGMENTS_DELIMITER_SIGN;
    }
    
    
    private isOptionName(segment: string): boolean {
        return segment[0] === '-';
    }
}

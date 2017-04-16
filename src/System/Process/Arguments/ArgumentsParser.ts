import {TextParser} from '../../../Core/Text/Parsing/TextParser';
import ArgumentsParserState from './ArgumentsParserState';
import Arguments from './Arguments';
import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';
import InvalidOperationException from '../../../Core/Exceptions/InvalidOperationException';
import Collection from '../../../Core/Collections/Collection';
import {EMPTY_STRING} from '../../../Core/Text/constants';
import ReadOnlyCollection from '../../../Core/Collections/ReadOnlyCollection';
import OptionsCollection from './OptionsCollection';
import Option from './Option';


const SEGMENTS_DELIMITER_SIGN: string = ' ';
const QUOT_ESCAPE_SIGN: string = '\\';
const DOUBLE_QUOT_CHAR: string = `"`;
const SINGLE_QUOT_CHAR: string = `'`;


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

        this.resetState();
        this.resetSegments();
        this.resetArguments();

        super.parse(command);

        this.flushSegment();

        this.createArguments();
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
    
    
    private createArguments(): void {
        let [executablePath, mainModulePath, ...segments] = this._segments.toArray();
        let commands: string[] = [];
        let options: Option[] = [];

        for (let index = 0; index < segments.length; index++) {
            let currentSegment: string = segments[index];
            let nextSegment: string = segments[index + 1];

            if (this.isOptionName(currentSegment)) {
                if (this.isLogicalOption(currentSegment, nextSegment)) {
                    options.push(new Option(currentSegment, true));
                } else {
                    options.push(new Option(currentSegment, nextSegment));
                    index += 1;
                }
            } else {
                commands.push(currentSegment);
            }
        }

        this._args = new Arguments(
            executablePath,
            mainModulePath,
            new ReadOnlyCollection(commands),
            new OptionsCollection(options)
        );
    }


    private resetArguments(): void {
        this._args = null;
    }


    private isLogicalOption(currentSegment: string, nextSegment: string): boolean {
        return this.isOptionName(currentSegment) && (!nextSegment || this.isOptionName(nextSegment));
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

import {ArgumentsParserState} from './ArgumentsParserState';
import {Arguments} from './Arguments';
import {Option} from './Option';
import {EMPTY_STRING} from '../../../text/main/constants';
import {ReadOnlyCollection} from '../../../collections-core/main/ReadOnlyCollection';
import {Map} from '../../../collections-core/main/Map';
import {AbstractStatefulParser} from '../../../text-parser-core/main/AbstractStatefulParser';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Collection} from '@monument/collections-core/main/Collection';


const SEGMENTS_DELIMITER_SIGN: string = ' ';
const QUOT_ESCAPE_SIGN: string = '\\';
const DOUBLE_QUOT_CHAR: string = `"`;
const SINGLE_QUOT_CHAR: string = `'`;


export class ArgumentsParser extends AbstractStatefulParser<ArgumentsParserState, Arguments> {

    protected getInitialState(): ArgumentsParserState {
        return new ArgumentsParserState();
    }


    protected onAfterParsing(): void {
        this.flushSegment();
    }


    public get result(): Arguments {
        let [executablePath, mainModulePath, ...segments] = this.state.segments.toArray();
        let commands: Collection<string> = new ArrayList();
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

        return new Arguments(
            executablePath,
            mainModulePath,
            new ArrayList(commands),
            new Map(options)
        );
    }


    protected next(): void {
        if (this.state.inQuotedSegment) {
            if (this.isTrailingQuot()) {
                this.endQuotedSegment();
            } else {
                this.state.text += this.state.currentChar;
            }
        } else {
            if (this.isLeadingQuot()) {
                this.beginQuotedSegment();
            } else if (this.isSegmentDelimiter()) {
                this.flushSegment();
            } else {
                this.state.text += this.state.currentChar;
            }
        }
    }


    private beginQuotedSegment(): void {
        this.state.inQuotedSegment = true;
        this.state.quotSign = this.state.currentChar;
    }


    private endQuotedSegment(): void {
        this.flushSegment();

        this.state.inQuotedSegment = false;
        this.state.quotSign = EMPTY_STRING;
    }


    private flushSegment(): void {
        if (this.state.text.length > 0) {
            this.state.segments.add(this.state.text);
        }

        this.state.text = EMPTY_STRING;
    }


    private isLogicalOption(currentSegment: string, nextSegment: string): boolean {
        return this.isOptionName(currentSegment) && (!nextSegment || this.isOptionName(nextSegment));
    }


    private isLeadingQuot(): boolean {
        let {quotSign, currentChar} = this.state;

        return quotSign === EMPTY_STRING && (currentChar === DOUBLE_QUOT_CHAR || currentChar === SINGLE_QUOT_CHAR);
    }


    private isTrailingQuot(): boolean {
        let {quotSign, previousChar, currentChar} = this.state;

        return quotSign !== EMPTY_STRING && currentChar === quotSign && previousChar !== QUOT_ESCAPE_SIGN;
    }


    private isSegmentDelimiter(): boolean {
        return this.state.currentChar === SEGMENTS_DELIMITER_SIGN;
    }


    private isOptionName(segment: string): boolean {
        return segment[0] === '-';
    }
}



export class ArgumentsParserState {
    public inQuotedSegment: boolean = false;
    public quotSign: string = '';
    public text: string = '';
    public previousChar: string = '';
}

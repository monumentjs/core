import {Collection} from '../../../collections-core/main/Collection';
import {TextParserContext} from '../../../text-parser-core/main/TextParserContext';
import {ArrayList} from '../../../collections/main/ArrayList';


export class ArgumentsParserState extends TextParserContext {
    public readonly segments: Collection<string> = new ArrayList();
    public inQuotedSegment: boolean = false;
    public quotSign: string = '';
    public text: string = '';
}

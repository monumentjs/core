import {Message} from '../message/Message';
import {AbstractFilter} from './AbstractFilter';
import {FilterDecision} from './FilterDecision';


export class RegExpFilter extends AbstractFilter {
    private readonly _pattern: RegExp;


    public constructor(pattern: RegExp) {
        super();

        this._pattern = pattern;
    }


    public async decide(message: Message): Promise<FilterDecision> {
        return this._pattern.test(message.text) ? FilterDecision.ACCEPT : FilterDecision.DENY;
    }
}

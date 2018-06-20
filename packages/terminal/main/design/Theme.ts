import {Rule} from './Rule';
import {TextColor} from './TextColor';
import {TextStyle} from './TextStyle';


export class Theme implements Rule {
    public static readonly SUCCESS_STATUS = new Theme(TextColor.GREEN, TextStyle.BOLD);
    public static readonly ERROR_STATUS = new Theme(TextColor.RED, TextStyle.BOLD);

    public static readonly ERROR_MESSAGE = new Theme(TextColor.RED);

    public static readonly HEADING = new Theme(TextStyle.BOLD);

    private readonly _rules: Rule[];


    public constructor(...rules: Rule[]) {
        this._rules = rules;
    }


    public apply(text: string): string {
        for (const rule of this._rules) {
            text = rule.apply(text);
        }

        return text;
    }
}

import {Rule} from './Rule';


export class Theme implements Rule {
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

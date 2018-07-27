import {UrlRewriteRuleDefinition} from './UrlRewriteRuleDefinition';


export class UrlRewriteRule {
    public readonly definition: UrlRewriteRuleDefinition;

    public constructor(definition: UrlRewriteRuleDefinition) {
        this.definition = definition;
    }

    public match(url: string): boolean {
        return this.definition.from === url;
    }
}

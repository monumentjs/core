import {Component} from '@monument/core/main/stereotype/Component';
import {Sequence} from '@monument/core/main/collection/Sequence';
import {UrlRewriteRuleDefinition} from './UrlRewriteRuleDefinition';
import {UrlRewriteRule} from './UrlRewriteRule';
import {LinkedList} from '@monument/core/main/collection/LinkedList';

@Component
export class UrlRewriteConfiguration {
    private readonly _rules: LinkedList<UrlRewriteRule> = new LinkedList<UrlRewriteRule>();

    public constructor(ruleDefinitions: Sequence<UrlRewriteRuleDefinition>) {
        for (const ruleDefinition of ruleDefinitions) {
            this._rules.add(new UrlRewriteRule(ruleDefinition));
        }
    }

    public findRule(url: string): UrlRewriteRule | undefined {
        return this._rules.first((rule: UrlRewriteRule): boolean => {
            return rule.match(url);
        });
    }
}

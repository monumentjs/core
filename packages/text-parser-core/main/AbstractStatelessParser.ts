import {StatelessParser} from './StatelessParser';
import {TextParserContext} from './TextParserContext';


export abstract class AbstractStatelessParser<TResult> implements StatelessParser<TResult> {

    public parse(input: string): TResult {
        let context: TextParserContext<TResult> = new TextParserContext();

        while (context.next()) {
            this.next(context);
        }

        return context.result;
    }


    protected abstract next(context: TextParserContext<TResult>): void;
}

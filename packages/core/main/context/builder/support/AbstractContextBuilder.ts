import {Context} from '../../Context';
import {ContextBuilder} from '../ContextBuilder';
import {Type} from '../../../Type';
import {ListSet} from '../../../collection/mutable/ListSet';
import {ConfigurableContext} from '../../ConfigurableContext';


export abstract class AbstractContextBuilder<TContext extends Context> implements ContextBuilder<TContext> {
    private readonly _types: ListSet<Type<object>> = new ListSet();


    public async build(): Promise<TContext> {
        const context = this.createContext();

        for (const type of this._types) {
            context.scan(type);
        }

        await context.initialize();
        await context.start();

        return context;
    }


    public scan(type: Type<object>): void {
        this._types.add(type);
    }


    public scanAll(types: Iterable<Type<object>>): void {
        this._types.addAll(types);
    }


    protected abstract createContext(): TContext & ConfigurableContext;
}

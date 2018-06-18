import {Context} from '../Context';
import {Type} from '../../Type';


export interface ContextBuilder<TContext extends Context> {
    scan(type: Type<object>): void;
    scanAll(types: Iterable<Type<object>>): void;
    build(): Promise<TContext>;
}

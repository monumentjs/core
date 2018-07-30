import {Context} from '../Context';
import {Type} from '../../Type';
import {Sequence} from '../../collection/readonly/Sequence';


export interface ContextBuilder<TContext extends Context> {
    scan(type: Type<object>): void;
    scanAll(types: Sequence<Type<object>>): void;
    build(): Promise<TContext>;
}

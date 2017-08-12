import {Constructor} from '../../types';
import {Assert} from '../../Assertion/Assert';


export class PropertyDefinition<T> {
    public constructor(
        public readonly name: string | symbol,
        public readonly type: Constructor<T>
    ) {
        Assert.argument('name', name).notNull();
        Assert.argument('type', type).notNull();
    }
}

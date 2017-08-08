import {MetadataContainer} from './MetadataContainer';
import {Assert} from '../../Assertion/Assert';


export class ReflectionBase<TEntity extends object = object> {
    public readonly metadata: MetadataContainer;


    public constructor(
        public readonly entity: TEntity,
        metadataKey: symbol
    ) {
        Assert.argument('entity', entity).notNull();
        Assert.argument('metadataKey', metadataKey).notNull();

        if (entity[metadataKey] == null) {
            entity[metadataKey] = new MetadataContainer();
        }

        this.metadata = entity[metadataKey];
    }
}

import {MetadataContainer} from '../Metadata/MetadataContainer';
import {Assert} from '../../../Assertion/Assert';


export class ReflectionBase<TEntity extends object = object> {
    private _entity: TEntity;
    private _metadataKey: symbol;


    protected get entity(): TEntity {
        return this._entity;
    }


    public constructor(entity: TEntity, metadataKey: symbol) {
        Assert.argument('entity', entity).notNull();
        Assert.argument('metadataKey', metadataKey).notNull();

        this._entity = entity;
        this._metadataKey = metadataKey;
    }


    public getMetadata(): MetadataContainer {
        if (!this.hasMetadata()) {
            this._entity[this._metadataKey] = new MetadataContainer();
        }

        return this._entity[this._metadataKey];
    }


    public hasMetadata(): boolean {
        return this._metadataKey in this._entity;
    }
}

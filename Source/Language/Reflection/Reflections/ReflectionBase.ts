import {MetadataContainer} from '../Metadata/MetadataContainer';
import {Assert} from '../../../Assertion/Assert';


export class ReflectionBase<TEntity = object> {
    private _entity: TEntity;
    private _metadataKey: string;


    protected get entity(): TEntity {
        return this._entity;
    }


    public constructor(entity: TEntity, metadataKey: string) {
        Assert.argument('entity', entity).notNull();
        Assert.argument('metadataKey', metadataKey).notNull();

        this._entity = entity;
        this._metadataKey = metadataKey;
    }


    public getMetadata(): MetadataContainer {
        return this._entity[this._metadataKey] || null;
    }


    public hasMetadata(): boolean {
        return this._entity[this._metadataKey] != null;
    }


    protected getOrCreateMetadata(): MetadataContainer {
        if (!this.hasMetadata()) {
            this._entity[this._metadataKey] = new MetadataContainer();
        }

        return this.getMetadata();
    }
}

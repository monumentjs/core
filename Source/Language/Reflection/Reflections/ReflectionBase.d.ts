import { MetadataContainer } from '../Metadata/MetadataContainer';
export declare class ReflectionBase<TEntity = object> {
    private _entity;
    private _metadataKey;
    protected readonly entity: TEntity;
    constructor(entity: TEntity, metadataKey: string);
    getMetadata(): MetadataContainer;
    hasMetadata(): boolean;
    protected getOrCreateMetadata(): MetadataContainer;
}

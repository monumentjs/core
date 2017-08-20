import {MetadataContainer} from './MetadataContainer';
import {Assert} from '../../Assertion/Assert';
import {MetadataContainerList} from './MetadataContainerList';


export abstract class ReflectionBase<TEntity extends object = object> {
    public readonly metadata: MetadataContainer;


    public constructor(
        public readonly entity: TEntity,
        metadataKey: symbol
    ) {
        Assert.argument('entity', entity).notNull();
        Assert.argument('metadataKey', metadataKey).notNull();

        if (entity[metadataKey] == null || !entity.hasOwnProperty(metadataKey)) {
            entity[metadataKey] = new MetadataContainer(entity[metadataKey]);
        }

        this.metadata = entity[metadataKey];
    }


    public getAllMetadataContainers(): MetadataContainerList {
        const metadataContainers: MetadataContainerList = new MetadataContainerList();

        let metadata: MetadataContainer | null = this.metadata;

        while (metadata != null) {
            metadataContainers.insert(metadata, 0);
            metadata = metadata.parentMetadata;
        }

        return metadataContainers;
    }
}

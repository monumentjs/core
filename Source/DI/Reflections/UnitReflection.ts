import {Constructor} from '../../types';
import {ClassReflection} from '../../Language/Reflection/ClassReflection';
import {MetadataContainer} from '../../Language/Reflection/MetadataContainer';
import {MetadataToken} from '../../Language/Reflection/MetadataToken';
import {UnitProvider} from '../Providers/UnitProvider';
import {PropertyDefinitionCollection} from '../../Language/Reflection/PropertyDefinitionCollection';
import {MetadataContainerList} from '../../Language/Reflection/MetadataContainerList';


export class UnitReflection<T> extends ClassReflection<T> {
    public static readonly PROPERTY_DEFINITIONS_TOKEN: MetadataToken = new MetadataToken('PropertyDefinitions');
    public static readonly PROVIDER_TOKEN: MetadataToken = new MetadataToken('UnitProvider');


    public get propertyDefinitions(): PropertyDefinitionCollection {
        return this.metadata.get(UnitReflection.PROPERTY_DEFINITIONS_TOKEN);
    }


    public get provider(): UnitProvider<T> {
        return this.metadata.get(UnitReflection.PROVIDER_TOKEN);
    }


    public set provider(value: UnitProvider<T>) {
        this.metadata.set(UnitReflection.PROVIDER_TOKEN, value);
    }


    public constructor(type: Constructor<T>) {
        super(type);

        this.attachPropertyInjectors();
    }


    public getAllPropertyDefinitions(): PropertyDefinitionCollection {
        const properties: PropertyDefinitionCollection = new PropertyDefinitionCollection();
        const metadataContainers: MetadataContainerList = this.getAllMetadataContainers();

        for (let metadata of metadataContainers) {
            for (let property of metadata.get(UnitReflection.PROPERTY_DEFINITIONS_TOKEN)) {
                properties.add(property);
            }
        }

        return properties;
    }


    private attachPropertyInjectors(): void {
        const token: MetadataToken = UnitReflection.PROPERTY_DEFINITIONS_TOKEN;
        const metadata: MetadataContainer = this.metadata;

        if (!metadata.containsKey(token)) {
            metadata.set(token, new PropertyDefinitionCollection());
        }
    }
}

import {Constructor} from '../../types';
import {ClassReflection} from '../../Language/Reflection/ClassReflection';
import {MetadataContainer} from '../../Language/Reflection/MetadataContainer';
import {Dictionary} from '../../Collections/Dictionary';
import {MetadataToken} from '../../Language/Reflection/MetadataToken';
import {UnitProvider} from '../Providers/UnitProvider';


export class UnitReflection<T> extends ClassReflection<T> {
    public static readonly PROPERTY_INJECTORS_TOKEN: MetadataToken = new MetadataToken('PropertyInjectors');
    public static readonly PROVIDER_TOKEN: MetadataToken = new MetadataToken('UnitProvider');


    public get propertyInjectors(): Dictionary<string | symbol, Constructor<T>> {
        return this.metadata.get(UnitReflection.PROPERTY_INJECTORS_TOKEN);
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


    private attachPropertyInjectors(): void {
        const token: MetadataToken = UnitReflection.PROPERTY_INJECTORS_TOKEN;
        const metadata: MetadataContainer = this.metadata;

        if (!metadata.containsKey(token)) {
            metadata.set(token, new Dictionary());
        }
    }
}

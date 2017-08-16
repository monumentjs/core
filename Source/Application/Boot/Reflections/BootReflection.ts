import {ClassReflection} from '../../../Language/Reflection/ClassReflection';
import {MetadataToken} from '../../../Language/Reflection/MetadataToken';


export class BootReflection<T> extends ClassReflection<T> {
    public static readonly APPLICATION_INSTANCE_TOKEN: MetadataToken = new MetadataToken('ApplicationInstance');


    public get applicationInstance(): T {
        return this.metadata.get(BootReflection.APPLICATION_INSTANCE_TOKEN);
    }


    public set applicationInstance(value: T) {
        this.metadata.set(BootReflection.APPLICATION_INSTANCE_TOKEN, value);
    }


    public get hasApplicationInstance(): boolean {
        return this.applicationInstance != null;
    }
}

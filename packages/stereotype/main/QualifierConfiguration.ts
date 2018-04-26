import {Key} from '@monument/object-model/main/attributes/Key';


export class QualifierConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<QualifierConfiguration> = new Key();

    public readonly qualifier: string;


    public constructor(qualifier: string) {
        this.qualifier = qualifier;
    }
}

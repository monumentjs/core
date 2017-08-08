import {Assert} from '../../Assertion/Assert';


export class MetadataToken {
    public constructor(public readonly id: string) {
        Assert.argument('id', id).notNull();
    }


    public toString(): string {
        return `[MetadataToken: ${this.id}]`;
    }
}

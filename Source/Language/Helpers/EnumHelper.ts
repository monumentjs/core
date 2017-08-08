import {Assert} from '../../Assertion/Assert';
import {ReadOnlyCollection} from '../../Collections/ReadOnlyCollection';


export class EnumHelper<T> {
    public readonly keys: ReadOnlyCollection<string>;
    public readonly values: ReadOnlyCollection<T>;


    public constructor(protected readonly enumObject: object) {
        Assert.argument('enumObject', enumObject).notNull();

        this.keys = new ReadOnlyCollection(Object.keys(enumObject));
        this.values = new ReadOnlyCollection(Object.values(enumObject));
    }


    public hasKey(key: string): boolean {
        Assert.argument('key', key).notNull();

        return this.keys.contains(key);
    }


    public hasValue(value: T): boolean {
        Assert.argument('value', value).notNull();

        return this.values.contains(value);
    }
}

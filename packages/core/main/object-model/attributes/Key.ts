import {StringPool} from '../../StringPool';


export class Key<T> {
    public constructor(
        public readonly description: string = StringPool.BLANK
    ) {}

    public toString(): string {
        return this.description;
    }
}

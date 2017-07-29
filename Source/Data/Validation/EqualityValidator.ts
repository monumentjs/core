import {ValueValidator} from './ValueValidator';
import {IEqualityComparator} from '../../Collections/IEqualityComparator';
import {EqualityComparator} from '../../Collections/EqualityComparator';


export class EqualityValidator<T> extends ValueValidator<T> {
    public get equality(): boolean {
        return this._equality;
    }


    private _equality: boolean = true;


    public constructor(otherValueProvider: () => T, comparator: IEqualityComparator<T> = EqualityComparator.instance) {
        super();

        this.addValidator((value: T): boolean => {
            const otherValue: T = otherValueProvider();

            this._equality = !comparator.equals(value, otherValue);

            return this._equality;
        });
    }
}

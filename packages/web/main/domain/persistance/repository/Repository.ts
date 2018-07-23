import {ReadOnlyList} from '@monument/core/main/collections/ReadOnlyList';
import {Supplier} from '@monument/core/main/Supplier';
import {Observable} from '@monument/core/main/observable/Observable';


export interface Repository<T> extends Supplier<ReadOnlyList<T>>, Observable<ReadOnlyList<T>> {
    readonly length: Promise<number>;

    count(criteria: any): Promise<number>;
    findOne(criteria: any): Promise<T | undefined>;
    findAll(criteria: any): Promise<ReadOnlyList<T>>;
}

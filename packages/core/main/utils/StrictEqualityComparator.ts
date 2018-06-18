import {EqualityComparator} from '../EqualityComparator';
import {Singleton} from '../stereotype/Singleton';


@Singleton
export class StrictEqualityComparator implements EqualityComparator<any> {

    public equals(x: any, y: any): boolean {
        return x === y;
    }
}

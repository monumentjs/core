import {GetInstance} from './decorators/GetInstance';
import {Comparator} from './Comparator';
import {ComparisonResult} from './ComparisonResult';


export class NumberComparator implements Comparator<number> {
    @GetInstance()
    public static readonly instance: NumberComparator;


    public compare(x: number, y: number): ComparisonResult {
        if (x > y) {
            return ComparisonResult.GREATER;
        }

        if (x < y) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }
}

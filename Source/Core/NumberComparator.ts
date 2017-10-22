import {IComparator} from './Abstraction/IComparator';
import {ComparisonResult} from './Types/ComparisonResult';
import {GetInstance} from '../Language/Decorators/GetInstance';


export class NumberComparator implements IComparator<number> {
    @GetInstance()
    public static readonly instance: NumberComparator;


    public compare(x: number, y: number): ComparisonResult {
        if (x > y) {
            return ComparisonResult.Greater;
        }

        if (x < y) {
            return ComparisonResult.Less;
        }

        return ComparisonResult.Equals;
    }
}

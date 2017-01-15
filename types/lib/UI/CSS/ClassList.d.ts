import { IFormattable, Pool } from '../../Core/types';
import Collection from '../../Core/Collection/Collection';
export default class ClassList extends Collection<string> implements IFormattable {
    static concat(...slices: Array<string | Pool<boolean>>): ClassList;
    toggle(names: string, enable?: boolean): void;
    toString(): string;
}

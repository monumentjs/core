import {ArrayList} from '../collections/ArrayList';
import {AbstractObservableList} from './AbstractObservableList';


export class ObservableArrayList<T> extends AbstractObservableList<T> {

    public constructor(items: Iterable<T> = []) {
        super(new ArrayList(items));
    }


    public clone(): ObservableArrayList<T> {
        return new ObservableArrayList(this);
    }
}

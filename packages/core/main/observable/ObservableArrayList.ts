import {ArrayList} from '../collection/mutable/ArrayList';
import {AbstractObservableList} from './AbstractObservableList';
import {Sequence} from '../collection/readonly/Sequence';


export class ObservableArrayList<T> extends AbstractObservableList<T> {

    public constructor(items: Sequence<T> = []) {
        super(new ArrayList(items));
    }


    public clone(): ObservableArrayList<T> {
        return new ObservableArrayList(this);
    }
}

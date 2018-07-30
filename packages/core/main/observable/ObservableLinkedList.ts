import {LinkedList} from '../collection/mutable/LinkedList';
import {AbstractObservableList} from './AbstractObservableList';
import {Sequence} from '../collection/readonly/Sequence';


export class ObservableLinkedList<T> extends AbstractObservableList<T> {

    public constructor(items: Sequence<T> = []) {
        super(new LinkedList(items));
    }


    public clone(): ObservableLinkedList<T> {
        return new ObservableLinkedList(this);
    }
}

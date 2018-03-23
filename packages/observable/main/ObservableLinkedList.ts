import {LinkedList} from '@monument/collections/main/LinkedList';
import {AbstractObservableList} from './AbstractObservableList';


export class ObservableLinkedList<T> extends AbstractObservableList<T> {

    public constructor(items: Iterable<T> = []) {
        super(new LinkedList(items));
    }


    public clone(): ObservableLinkedList<T> {
        return new ObservableLinkedList(this);
    }
}

import {Sequence} from '../../base/Sequence';
import {AbstractImmutableList} from './AbstractImmutableList';
import {ImmutableList} from './ImmutableList';
import {LinkedList} from '../mutable/LinkedList';


/**
 * @author Alex Chugaev
 * @immutable
 * @since 0.0.1
 */
export class ImmutableLinkedList<T> extends AbstractImmutableList<T> {

    public constructor(items?: Sequence<T>) {
        super(new LinkedList(items));
    }

    protected create<I>(items?: Sequence<I>): ImmutableList<I> {
        return new ImmutableLinkedList(items);
    }
}

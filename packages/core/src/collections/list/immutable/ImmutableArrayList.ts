import {Sequence} from '../../base/Sequence';
import {ArrayList} from '../mutable/ArrayList';
import {AbstractImmutableList} from './AbstractImmutableList';
import {ImmutableList} from './ImmutableList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 */
export class ImmutableArrayList<T> extends AbstractImmutableList<T> {

    public constructor(items?: Sequence<T>) {
        super(new ArrayList(items));
    }

    protected create<I>(items?: Sequence<I>): ImmutableList<I> {
        return new ImmutableArrayList(items);
    }
}

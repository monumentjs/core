import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {Message} from '../message/Message';
import {Filter} from '../filter/Filter';


export interface Filterable extends Lifecycle {
    readonly filters: ReadOnlySet<Filter>;

    /**
     * Determines if the event should be filtered.
     */
    isFiltered(message: Message): Promise<boolean>;
}

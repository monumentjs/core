import {Message} from '../message/Message';
import {Filter} from '../filter/Filter';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';


export interface Filterable extends Lifecycle {
    readonly filters: ReadOnlySet<Filter>;

    /**
     * Determines if the event should be filtered.
     */
    isFiltered(message: Message): Promise<boolean>;
}

import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {LogEvent} from '../event/LogEvent';
import {Filter} from '../filter/Filter';


export interface Filterable extends Lifecycle {
    readonly filters: ReadOnlySet<Filter>;

    /**
     * Determines if the event should be filtered.
     */
    isFiltered(event: LogEvent): Promise<boolean>;
}

import {AbstractLifecycle} from '@monument/core/main/lifecycle/AbstractLifecycle';
import {ListSet} from '@monument/collections/main/ListSet';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {Message} from '../message/Message';
import {Filter} from '../filter/Filter';
import {Filterable} from './Filterable';
import {FilterDecision} from '../filter/FilterDecision';


export class AbstractFilterable extends AbstractLifecycle implements Filterable {
    private readonly _filters: ListSet<Filter>;

    public get filters(): ReadOnlySet<Filter> {
        return this._filters;
    }


    public constructor(filters?: Iterable<Filter>) {
        super();

        this._filters = new ListSet(filters);
    }


    public async isFiltered(message: Message): Promise<boolean> {
        for (const filter of this.filters) {
            const decision: FilterDecision = await filter.decide(message);

            if (decision === FilterDecision.DENY) {
                return true;
            }
        }

        return false;
    }


    public async initialize(): Promise<void> {
        this.setInitializing();

        await Promise.all(this.filters.toArray().map((filter) => {
            return filter.initialize();
        }));

        this.setInitialized();
    }


    public async start(): Promise<void> {
        this.setStarting();

        await Promise.all(this.filters.toArray().map((filter) => {
            return filter.start();
        }));

        this.setStarted();
    }


    public async stop(): Promise<void> {
        this.setStopping();

        await Promise.all(this.filters.toArray().map((filter) => {
            return filter.stop();
        }));

        this.setStopped();
    }
}

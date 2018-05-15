import {AbstractFilterable} from '../filterable/AbstractFilterable';
import {Filter} from '../filter/Filter';
import {LogEvent} from '../event/LogEvent';
import {Appender} from './Appender';


export abstract class AbstractAppender extends AbstractFilterable implements Appender {
    private readonly _name: string;

    public get name(): string {
        return this._name;
    }


    protected constructor(name: string, filters?: Iterable<Filter>) {
        super(filters);

        this._name = name;
    }


    public async append(event: LogEvent): Promise<void> {
        if (await this.isFiltered(event)) {
            return;
        }

        return this.doAppend(event);
    }


    public initialize(): Promise<void> {
        return super.initialize();
    }


    public start(): Promise<void> {
        return super.start();
    }


    public stop(): Promise<void> {
        return super.stop();
    }


    protected abstract doAppend(event: LogEvent): Promise<void>;
}

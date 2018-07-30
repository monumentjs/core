import {AbstractFilterable} from '../filterable/AbstractFilterable';
import {Filter} from '../filter/Filter';
import {Message} from '../message/Message';
import {Appender} from './Appender';
import {Sequence} from '@monument/core/main/collection/readonly/Sequence';


export abstract class AbstractAppender extends AbstractFilterable implements Appender {
    private readonly _name: string;

    public get name(): string {
        return this._name;
    }


    protected constructor(name: string, filters?: Sequence<Filter>) {
        super(filters);

        this._name = name;
    }


    public async append(message: Message): Promise<void> {
        if (await this.isFiltered(message)) {
            return;
        }

        return this.doAppend(message);
    }


    protected abstract doAppend(message: Message): Promise<void>;
}

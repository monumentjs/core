import {ListSet} from '@monument/core/main/collections/ListSet';
import {ReadOnlySet} from '@monument/core/main/collections/ReadOnlySet';
import {Appender} from '../appender/Appender';


export class LoggerConfiguration {
    private readonly _appenders: ListSet<Appender>;


    public constructor(appenders?: Iterable<Appender>) {
        this._appenders = new ListSet(appenders);
    }


    public get appenders(): ReadOnlySet<Appender> {
        return this._appenders;
    }
}

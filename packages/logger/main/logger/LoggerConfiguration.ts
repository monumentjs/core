import {ListSet} from '@monument/collections/main/ListSet';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
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

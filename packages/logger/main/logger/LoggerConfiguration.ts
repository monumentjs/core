import {ListSet} from 'core/main/collection/mutable/ListSet';
import {ReadOnlySet} from 'core/main/collection/readonly/ReadOnlySet';
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

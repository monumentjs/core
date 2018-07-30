import {ListSet} from '@monument/core/main/collection/mutable/ListSet';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {Appender} from '../appender/Appender';
import {Sequence} from '@monument/core/main/collection/readonly/Sequence';


export class LoggerConfiguration {
    private readonly _appenders: ListSet<Appender>;


    public constructor(appenders?: Sequence<Appender>) {
        this._appenders = new ListSet(appenders);
    }


    public get appenders(): ReadOnlySet<Appender> {
        return this._appenders;
    }
}

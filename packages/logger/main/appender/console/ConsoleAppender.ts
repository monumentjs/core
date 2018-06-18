import {Filter} from '../../filter/Filter';
import {Level} from '../../level/Level';
import {Message} from '../../message/Message';
import {MessageFormatter} from '../../message/MessageFormatter';
import {AbstractAppender} from '../AbstractAppender';


export class ConsoleAppender extends AbstractAppender {
    public static readonly DEFAULT_NAME: string = 'ConsoleAppender';

    private readonly _formatter: MessageFormatter;


    public constructor(name: string, formatter: MessageFormatter, filters?: Iterable<Filter>) {
        super(name, filters);

        this._formatter = formatter;
    }


    protected async doAppend(message: Message): Promise<void> {
        /* tslint:disable:no-console */
        const text: string = this._formatter.format(message);

        switch (message.level) {
            case Level.TRACE:
                console.trace(text);
                break;

            case Level.DEBUG:
                console.debug(text);
                break;

            case Level.INFO:
                console.info(text);
                break;

            case Level.WARNING:
                console.warn(text);
                break;

            case Level.ERROR:
                console.error(text);
                break;

            case Level.FATAL:
                console.error(text);
                break;

            default:
        }
    }
}

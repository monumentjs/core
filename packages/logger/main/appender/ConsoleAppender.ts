import {Filter} from '../filter/Filter';
import {LogEvent} from '../event/LogEvent';
import {Level} from '../level/Level';
import {AbstractAppender} from './AbstractAppender';


export class ConsoleAppender extends AbstractAppender {
    public static readonly DEFAULT_NAME: string = 'ConsoleAppender';


    public constructor(filters?: Iterable<Filter>) {
        super(ConsoleAppender.DEFAULT_NAME, filters);
    }


    protected async doAppend(event: LogEvent): Promise<void> {
        /* tslint:disable:no-console */

        switch (event.level) {
            case Level.TRACE:
                console.trace(event.message.text);
                break;

            case Level.DEBUG:
                console.debug(event.message.text);
                break;

            case Level.INFO:
                console.info(event.message.text);
                break;

            case Level.WARNING:
                console.warn(event.message.text);
                break;

            case Level.ERROR:
                console.error(event.message.text, event.message.error);
                break;

            case Level.FATAL:
                console.error(event.message.text, event.message.error);
                break;

            default:
        }
    }
}

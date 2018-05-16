import {Filter} from '../../filter/Filter';
import {LogEvent} from '../../event/LogEvent';
import {Level} from '../../level/Level';
import {AbstractAppender} from '../AbstractAppender';
import {ConsoleMessageLayout} from './ConsoleMessageLayout';


export class ConsoleAppender extends AbstractAppender {
    public static readonly DEFAULT_NAME: string = 'ConsoleAppender';

    private readonly _layout: ConsoleMessageLayout;


    public constructor(layout: ConsoleMessageLayout = ConsoleMessageLayout.DEFAULT, filters?: Iterable<Filter>) {
        super(ConsoleAppender.DEFAULT_NAME, filters);

        this._layout = layout;
    }


    protected async doAppend(event: LogEvent): Promise<void> {
        /* tslint:disable:no-console */
        const message: string = this._layout.serialize(event);

        switch (event.level) {
            case Level.TRACE:
                console.trace(message);
                break;

            case Level.DEBUG:
                console.debug(message);
                break;

            case Level.INFO:
                console.info(message);
                break;

            case Level.WARNING:
                console.warn(message);
                break;

            case Level.ERROR:
                console.error(message);
                break;

            case Level.FATAL:
                console.error(message);
                break;

            default:
        }
    }
}

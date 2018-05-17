import {Filter} from '../../filter/Filter';
import {Level} from '../../level/Level';
import {Message} from '../../message/Message';
import {AbstractAppender} from '../AbstractAppender';
import {ConsoleMessageLayout} from './ConsoleMessageLayout';


export class ConsoleAppender extends AbstractAppender {
    public static readonly DEFAULT_NAME: string = 'ConsoleAppender';

    private readonly _layout: ConsoleMessageLayout;


    public constructor(layout: ConsoleMessageLayout = ConsoleMessageLayout.DEFAULT, filters?: Iterable<Filter>) {
        super(ConsoleAppender.DEFAULT_NAME, filters);

        this._layout = layout;
    }


    protected async doAppend(message: Message): Promise<void> {
        /* tslint:disable:no-console */
        const text: string = this._layout.serialize(message);

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

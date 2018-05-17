import {TemplateString} from '@monument/text/main/TemplateString';
import {Level} from '../../level/Level';
import {Message} from '../../message/Message';


export class ConsoleMessageLayout {
    public static readonly DEFAULT: ConsoleMessageLayout = new ConsoleMessageLayout(
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}\r\n{error}'),
        new TemplateString('[{level}] {loggerName}: {text}\r\n{error}')
    );

    public static readonly SIMPLE: ConsoleMessageLayout = new ConsoleMessageLayout(
        new TemplateString('{text}'),
        new TemplateString('{text}'),
        new TemplateString('{text}'),
        new TemplateString('{text}'),
        new TemplateString('{text}\n\n{error}'),
        new TemplateString('{text}\n\n{error}')
    );


    private readonly _trace: TemplateString;
    private readonly _debug: TemplateString;
    private readonly _info: TemplateString;
    private readonly _warning: TemplateString;
    private readonly _error: TemplateString;
    private readonly _fatal: TemplateString;


    public constructor(
        trace: TemplateString,
        debug: TemplateString,
        info: TemplateString,
        warning: TemplateString,
        error: TemplateString,
        fatal: TemplateString
    ) {
        this._trace = trace;
        this._debug = debug;
        this._info = info;
        this._warning = warning;
        this._error = error;
        this._fatal = fatal;
    }


    public serialize(message: Message): string {
        switch (message.level) {
            case Level.TRACE:
                return this._trace.fillByKeys(message.values);

            case Level.DEBUG:
                return this._debug.fillByKeys(message.values);

            case Level.INFO:
                return this._info.fillByKeys(message.values);

            case Level.WARNING:
                return this._warning.fillByKeys(message.values);

            case Level.ERROR:
                return this._error.fillByKeys(message.values);

            case Level.FATAL:
                return this._fatal.fillByKeys(message.values);

            default:
                return message.text;
        }
    }
}

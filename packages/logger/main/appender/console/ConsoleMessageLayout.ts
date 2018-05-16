import {TemplateString} from '@monument/text/main/TemplateString';
import {Level} from '../../level/Level';
import {LogEvent} from '../../event/LogEvent';


export class ConsoleMessageLayout {
    public static readonly DEFAULT: ConsoleMessageLayout = new ConsoleMessageLayout(
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}'),
        new TemplateString('[{level}] {loggerName}: {text}\n{errorMessage}\n{errorStack}'),
        new TemplateString('[{level}] {loggerName}: {text}\n{errorMessage}\n{errorStack}')
    );

    public static readonly SIMPLE: ConsoleMessageLayout = new ConsoleMessageLayout(
        new TemplateString('{text}'),
        new TemplateString('{text}'),
        new TemplateString('{text}'),
        new TemplateString('{text}'),
        new TemplateString('{text}\n{errorMessage}\n{errorStack}'),
        new TemplateString('{text}\n{errorMessage}\n{errorStack}')
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


    public serialize(event: LogEvent): string {
        switch (event.level) {
            case Level.TRACE:
                return this._trace.fillByKeys(event.values);

            case Level.DEBUG:
                return this._debug.fillByKeys(event.values);

            case Level.INFO:
                return this._info.fillByKeys(event.values);

            case Level.WARNING:
                return this._warning.fillByKeys(event.values);

            case Level.ERROR:
                return this._error.fillByKeys(event.values);

            case Level.FATAL:
                return this._fatal.fillByKeys(event.values);

            default:
                return event.message.text;
        }
    }
}

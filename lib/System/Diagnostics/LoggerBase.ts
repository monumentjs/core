import {ILogger} from './ILogger';
import {ILogRecord} from './ILogRecord';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import FormattableString from '../Text/FormattableString';
import {NEW_LINE_SIGN} from '../Text/constants';
import {AsyncResult} from '../../Core/types';


export abstract class LoggerBase implements ILogger {
    private _lineSeparator: string = NEW_LINE_SIGN;


    public get lineSeparator(): string {
        return this._lineSeparator;
    }


    public set lineSeparator(value: string) {
        assertArgumentNotNull('value', value);

        this._lineSeparator = value;
    }


    public async write(record: ILogRecord): AsyncResult<void> {
        assertArgumentNotNull('record', record);

        await this.onWrite(record);
    }


    public async writeLine(message: string): AsyncResult<void> {
        await this.write(message + this._lineSeparator);
    }


    public async writeFormat(format: string, ...values: any[]): AsyncResult<void> {
        assertArgumentNotNull('format', format);

        let template: FormattableString = new FormattableString(format);

        await this.writeLine(template.fillByPositions(values));
    }


    protected abstract async onWrite(record: ILogRecord): AsyncResult<void>;
}

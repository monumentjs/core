import {LoggerBase} from './LoggerBase';
import {ILogRecord} from './ILogRecord';
import {Assert} from '../../Core/Assertion/Assert';
import {Writable} from '../Stream/Writable';


export class LogWriter extends LoggerBase {
    private _target: Writable<string>;


    public get target(): Writable<string> {
        return this._target;
    }


    public set target(value: Writable<string>) {
        Assert.argument('value', value).notNull();

        this._target = value;
    }


    public constructor(target: Writable<string>) {
        Assert.argument('target', target).notNull();

        super();

        this.target = target;
    }


    protected async doWrite(record: ILogRecord): Promise<void> {
        await this._target.write(record.toString());
    }
}

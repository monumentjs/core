import {Path} from '../path/Path';
import {ProcessPool} from './ProcessPool';
import {ChildProcess} from './ChildProcess';
import {Fork} from './Fork';


export class ForkPool<TMessage> extends ProcessPool<TMessage> {
    private readonly _moduleFile: Path;
    private readonly _args: string[];


    public constructor(size: number, moduleFile: Path, ...args: string[]) {
        super(size);
        this._moduleFile = moduleFile;
        this._args = args;
        this.initialize();
    }


    protected createProcess(): ChildProcess<TMessage> {
        return new Fork<TMessage>(this._moduleFile, ...this._args);
    }
}

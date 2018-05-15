import {Path} from '../path/Path';
import {ProcessPool} from './ProcessPool';
import {ChildProcess} from './ChildProcess';
import {Fork} from './Fork';


export class ForkPool extends ProcessPool {
    private readonly _moduleFile: Path;
    private readonly _args: string[];


    public constructor(capacity: number, moduleFile: Path, ...args: string[]) {
        super(capacity);
        this._moduleFile = moduleFile;
        this._args = args;
        this.initialize();
    }


    protected createProcess(id: number): ChildProcess {
        return new Fork(this._moduleFile, ...this._args, `--fork-id=${id}`);
    }
}

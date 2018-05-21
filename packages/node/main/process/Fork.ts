import {fork} from 'child_process';
import {Path} from '../path/Path';
import {AbstractChildProcess} from './AbstractChildProcess';


export class Fork<TMessage> extends AbstractChildProcess<TMessage> {

    public constructor(moduleFile: Path, ...args: string[]) {
        super(fork(moduleFile.toString(), args, {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        }));
    }
}

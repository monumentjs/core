import {fork} from 'child_process';
import {Path} from '../path/Path';
import {AbstractChildProcess} from './AbstractChildProcess';


export class Fork extends AbstractChildProcess {

    public constructor(moduleFile: Path, ...args: string[]) {
        super(fork(moduleFile.toString(), args, {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        }));
    }
}

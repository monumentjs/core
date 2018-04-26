import {fork} from 'child_process';
import {AbstractSubProcess} from './AbstractSubProcess';


export class Fork<TMessage> extends AbstractSubProcess<TMessage> {

    public constructor(moduleFile: string, ...args: string[]) {
        super(fork(moduleFile, args, {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        }));
    }
}

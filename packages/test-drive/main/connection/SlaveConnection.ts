import {Component} from '@monument/stereotype/main/Component';
import {Lazy} from '@monument/stereotype/main/Lazy';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {Connection} from './Connection';


@Lazy
@Component
export class SlaveConnection extends Connection {

    public constructor(currentProcess: CurrentProcess) {
        super(currentProcess);
    }
}

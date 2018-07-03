import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {Connection} from './Connection';
import {Lazy} from '@monument/core/main/stereotype/configuration/Lazy';
import {Component} from '@monument/core/main/stereotype/Component';


@Lazy
@Component
export class SlaveConnection extends Connection {

    public constructor(currentProcess: CurrentProcess) {
        super(currentProcess);
    }

}

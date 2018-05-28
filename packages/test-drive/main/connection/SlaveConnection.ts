import {Component} from '@monument/decorators/main/stereotype/Component';
import {Lazy} from '@monument/decorators/main/stereotype/configuration/Lazy';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {Connection} from './Connection';


@Lazy
@Component
export class SlaveConnection extends Connection {

    public constructor(currentProcess: CurrentProcess) {
        super(currentProcess);
    }
}

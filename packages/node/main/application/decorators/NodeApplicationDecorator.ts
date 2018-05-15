import {Class} from '@monument/reflection/main/Class';
import {ApplicationDecorator} from '@monument/stereotype/main/ApplicationDecorator';
import {ApplicationConfiguration} from '@monument/stereotype/main/ApplicationConfiguration';
import {CurrentProcess} from '../../process/CurrentProcess';
import {NodeApplication} from './NodeApplication';


export class NodeApplicationDecorator extends ApplicationDecorator {

    public constructor(configuration: ApplicationConfiguration) {
        configuration.addComponent(CurrentProcess);

        super(configuration);
    }


    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(NodeApplication);
    }
}

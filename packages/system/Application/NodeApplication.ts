import {AbstractApplication} from '../../application/main/AbstractApplication';
import {Delegate} from '@monument/core/Events/Decorators/Delegate';


export abstract class NodeApplication extends AbstractApplication {
    public constructor() {
        super();

        process.on('unhandledRejection', this.onUnhandledRejection);
    }


    public abstract main(): Promise<void>;


    @Delegate()
    protected onUnhandledRejection(error: any): void {
        throw error;
    }
}

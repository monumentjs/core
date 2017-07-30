import {Application} from '../../../../Source/Application/Application';
import {TestApplicationConfiguration} from './TestApplicationConfiguration';
import {Exception} from '../../../../Source/Exceptions/Exception';


export class TestApplication extends Application<TestApplicationConfiguration> {

    public async main(): Promise<void> {
        const workComplete = this.configuration.activate();

        if (!workComplete) {
            throw new Exception('Application failed');
        }
    }
}

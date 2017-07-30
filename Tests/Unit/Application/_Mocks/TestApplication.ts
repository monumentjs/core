import {Application} from '../../../../Source/Application/Application';
import {TestApplicationConfiguration} from './TestApplicationConfiguration';
import {Exception} from '../../../../Source/Exceptions/Exception';
import {DI} from '../../../../Source/DI/DI';


@DI.provider({
    isSingleton: true,
    providers: [TestApplicationConfiguration]
})
export class TestApplication extends Application<TestApplicationConfiguration> {

    public async main(): Promise<void> {
        const workComplete = this.configuration.activate();

        if (!workComplete) {
            throw new Exception('Application failed');
        }
    }
}

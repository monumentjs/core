import {Application} from '../../../../Source/Application/Application';
import {TestApplicationConfiguration} from './TestApplicationConfiguration';
import {Exception} from '../../../../Source/Exceptions/Exception';
import {Unit} from '../../../../Source/DI/Decorators/Unit';


@Unit({
    providers: [TestApplicationConfiguration]
})
export class TestApplication extends Application {

    public constructor(
        public readonly configuration: TestApplicationConfiguration
    ) {
        super();
    }


    public async main(): Promise<void> {
        const workComplete = this.configuration.activate();

        if (!workComplete) {
            throw new Exception('Application failed');
        }
    }
}

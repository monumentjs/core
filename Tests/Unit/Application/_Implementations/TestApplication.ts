import {Application} from '../../../../Source/Application/Application';
import {TestApplicationConfiguration} from './TestApplicationConfiguration';
import {Exception} from '../../../../Source/Exceptions/Exception';
import {Unit} from '../../../../Source/DI/Decorators/Unit';
import {Assert} from '../../../../Source/Assertion/Assert';


@Unit({
    providers: [TestApplicationConfiguration]
})
export class TestApplication extends Application {

    public constructor(
        public readonly configuration: TestApplicationConfiguration
    ) {
        super();

        Assert.argument('configuration', configuration).notNull();
    }


    public async main(): Promise<void> {
        const workComplete = this.configuration.activate();

        if (!workComplete) {
            throw new Exception('Application failed');
        }
    }
}

import {ApplicationContext} from '../../../../Source/Application/ApplicationContext';
import {TestApplicationConfiguration} from './TestApplicationConfiguration';
import {TestApplication} from './TestApplication';


export class TestApplicationContext extends ApplicationContext<TestApplicationConfiguration, TestApplication> {
    public readonly configuration: TestApplicationConfiguration = new TestApplicationConfiguration();
    
}

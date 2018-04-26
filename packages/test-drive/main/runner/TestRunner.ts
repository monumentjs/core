import {Type} from '@monument/core/main/Type';
import {Collection} from '@monument/collections/main/Collection';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Service} from '@monument/stereotype/main/Service';
import {DefaultContext} from '@monument/ioc/main/context/support/DefaultContext';
import {ContextAware} from '@monument/ioc/main/context/configuration/ContextAware';
import {Context} from '@monument/ioc/main/context/Context';
import {TestScenario} from '../scenario/TestScenario';
import {Reporter} from '../reporter/Reporter';


@Service
export class TestRunner implements ContextAware {
    private readonly _reporters: Collection<Reporter> = new ArrayList();
    private _applicationContext?: Context;


    public setContext(value: Context) {
        this._applicationContext = value;
    }


    public addReporter(reporter: Reporter) {
        this._reporters.add(reporter);
    }


    public async run(testConstructor: Type<object>): Promise<void> {
        const scenario: TestScenario = new TestScenario(testConstructor);
        const testsContext: Context = await this.createTestsContext(testConstructor);

        await scenario.run(testsContext);
    }


    private async createTestsContext(testsConstructor: Type<object>): Promise<Context> {
        const testsContext: DefaultContext = new DefaultContext();

        testsContext.parent = this._applicationContext;

        testsContext.scan(testsConstructor);

        await testsContext.start();

        return testsContext;
    }
}

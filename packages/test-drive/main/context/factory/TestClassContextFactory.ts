import {AssertionModule} from '../../assert/AssertionModule';
import {ApplicationContext} from '@monument/core/main/application/context/ApplicationContext';
import {Component} from '@monument/core/main/stereotype/Component';
import {TestClassContext} from '../TestClassContext';
import {Type} from '@monument/core/main/Type';
import {Disposable} from '@monument/core/main/Disposable';
import {Init} from '@monument/core/main/stereotype/lifecycle/Init';
import {Destroy} from '@monument/core/main/stereotype/lifecycle/Destroy';


@Component
export class TestClassContextFactory implements Disposable {
    private readonly _commonTestContext: ApplicationContext = new ApplicationContext();


    public async get(testConstructor: Type<object>): Promise<TestClassContext> {
        const context: TestClassContext = new TestClassContext(this._commonTestContext);

        context.scan(testConstructor);

        await context.initialize();
        await context.start();

        return context;
    }


    @Init
    public async initialize(): Promise<void> {
        this._commonTestContext.scan(AssertionModule);

        await this._commonTestContext.initialize();
        await this._commonTestContext.start();
    }


    @Destroy
    public dispose() {
        return this._commonTestContext.stop();
    }
}

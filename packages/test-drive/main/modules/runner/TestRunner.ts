import {Type} from '@monument/core/main/Type';
import {DefaultContext} from '@monument/context/main/context/support/DefaultContext';
import {ContextAware} from '@monument/context/main/context/configuration/ContextAware';
import {Context} from '@monument/context/main/context/Context';
import {MethodInvoker} from '@monument/context/main/unit/factory/support/MethodInvoker';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Logger} from '@monument/logger/main/logger/Logger';
import {Component} from '@monument/stereotype/main/Component';
import {TestContext} from '../context/TestContext';
import {TestScenario} from '../scenario/TestScenario';


@Component
export class TestRunner implements ContextAware {
    private readonly _logger: Logger;
    private _parentContext!: Context;


    public constructor(lm: LoggerManager) {
        this._logger = lm.getLogger(this.constructor.name);
    }


    public setContext(value: Context) {
        this._parentContext = value;
    }


    public async run(type: Type<object>): Promise<void> {
        const scenario: TestScenario = new TestScenario(type);
        const context: TestContext = await this.createTestsContext(type);
        const invoker: MethodInvoker = new MethodInvoker(context);

        await scenario.run(context, invoker, this._logger);

        await context.stop();
    }


    private async createTestsContext(type: Type<object>): Promise<TestContext> {
        const context: DefaultContext = new TestContext(this._parentContext, type);

        await context.initialize();
        await context.start();

        return context;
    }
}

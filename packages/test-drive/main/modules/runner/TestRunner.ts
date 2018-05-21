import {Type} from '@monument/core/main/Type';
import {ContextAware} from '@monument/context/main/context/configuration/ContextAware';
import {Context} from '@monument/context/main/context/Context';
import {UnitRequest} from '@monument/context/main/unit/factory/UnitRequest';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Logger} from '@monument/logger/main/logger/Logger';
import {Component} from '@monument/stereotype/main/Component';
import {Method} from '@monument/reflection/main/Method';
import {TestContext} from '../context/TestContext';
import {TestScenario} from '../scenario/TestScenario';
import {TestCommand} from '../reporter/TestCommand';
import {TestFileReport} from '../reporter/TestFileReport';


@Component
export class TestRunner implements ContextAware {
    private readonly _logger: Logger;
    private _parentContext!: Context;


    public constructor(loggerManager: LoggerManager) {
        this._logger = loggerManager.getLogger(this.constructor.name);
    }


    public setContext(value: Context) {
        this._parentContext = value;
    }


    public async run(command: TestCommand): Promise<TestFileReport> {
        command.start();

        try {
            await this.exec(command);
        } catch (e) {
            await this._logger.error('Error occurred during test run', e);
        }

        command.end();

        return command.fileReport;
    }


    private async exec(command: TestCommand): Promise<void> {
        const constructor: Type<object> = command.testClass.type;
        const scenario: TestScenario = new TestScenario(command.testClass);

        if (!scenario.isIgnored) {
            const context: TestContext = await this.createTestsContext(constructor);
            const instance: object = await context.getUnit(constructor);

            for (const beforeAllMethod of scenario.beforeAllMethods) {
                await this.runTest(context, command, beforeAllMethod, instance);
            }

            for (const testMethod of scenario.testMethods) {
                for (const beforeEachMethod of scenario.beforeEachMethods) {
                    await this.runTest(context, command, beforeEachMethod, instance);
                }

                await this.runTest(context, command, testMethod, instance);

                for (const afterEachMethod of scenario.afterEachMethods) {
                    await this.runTest(context, command, afterEachMethod, instance);
                }
            }

            for (const afterAllMethod of scenario.afterAllMethods) {
                await this.runTest(context, command, afterAllMethod, instance);
            }

            await context.stop();
        }
    }


    private async runTest(context: TestContext, command: TestCommand, method: Method, instance: object): Promise<void> {
        try {
            await context.invoke(new UnitRequest(command.testClass.type), instance, method);
        } catch (error) {
            await this._logger.error(`${command.testClass.name} > ${method.name}`, error);
        }
    }


    private async createTestsContext(type: Type<object>): Promise<TestContext> {
        const context: TestContext = new TestContext(this._parentContext, type);

        await context.initialize();
        await context.start();

        return context;
    }
}

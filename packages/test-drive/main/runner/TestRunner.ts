import {Type} from '@monument/core/main/Type';
import {ContextAware} from '@monument/context/main/context/configuration/ContextAware';
import {Context} from '@monument/context/main/context/Context';
import {UnitRequest} from '@monument/context/main/unit/factory/UnitRequest';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Logger} from '@monument/logger/main/logger/Logger';
import {Component} from '@monument/decorators/main/stereotype/Component';
import {Method} from '@monument/reflection/main/Method';
import {TestContext} from '../context/TestContext';
import {TestScenario} from '../scenario/TestScenario';
import {SlaveConnection} from '../connection/SlaveConnection';
import {TestCommand} from '../reporter/TestCommand';
import {TestReport} from '../reporter/TestReport';
import {TestStatus} from '../reporter/TestStatus';
import {Exception} from '@monument/core/main/exceptions/Exception';


@Component
export class TestRunner implements ContextAware {
    private readonly _logger: Logger;
    private readonly _connection: SlaveConnection;
    private _parentContext!: Context;


    public constructor(loggerManager: LoggerManager, connection: SlaveConnection) {
        this._logger = loggerManager.getLogger(this.constructor.name);
        this._connection = connection;
    }


    public setContext(value: Context) {
        this._parentContext = value;
    }


    public async run(command: TestCommand): Promise<void> {
        try {
            await this.exec(command);
        } catch (e) {
            await this._logger.error('Error occurred during test run', e);
        }
    }


    private async exec(command: TestCommand): Promise<void> {
        const constructor: Type<object> = command.testClass.type;
        const scenario: TestScenario = new TestScenario(command.testClass);

        if (!scenario.isIgnored) {
            const context: TestContext = await this.createTestsContext(constructor);
            const instance: object = await context.getUnit(constructor);

            for (const beforeAllMethod of scenario.beforeAllMethods) {
                await this.invokeMethod(context, command, beforeAllMethod, instance);
            }

            for (const testMethod of scenario.testMethods) {
                for (const beforeEachMethod of scenario.beforeEachMethods) {
                    await this.invokeMethod(context, command, beforeEachMethod, instance);
                }

                await this.invokeMethod(context, command, testMethod, instance);

                for (const afterEachMethod of scenario.afterEachMethods) {
                    await this.invokeMethod(context, command, afterEachMethod, instance);
                }
            }

            for (const afterAllMethod of scenario.afterAllMethods) {
                await this.invokeMethod(context, command, afterAllMethod, instance);
            }

            await context.stop();
        }
    }


    private async invokeMethod(context: TestContext, command: TestCommand, method: Method, instance: object): Promise<void> {
        let error: Exception | undefined;

        const startTime: number = Date.now();

        try {
            await context.invoke(new UnitRequest(command.testClass.type), instance, method);
        } catch (e) {
            error = Exception.cast(e);
        }

        const endTime: number = Date.now();

        const report: TestReport = {
            testFilePath: command.filePath.toString(),
            testClassName: command.testClass.name,
            testMethodName: method.name.toString(),
            status: error == null ? TestStatus.PASSED : TestStatus.FAILED,
            duration: endTime - startTime,
            error: error
        };

        await this._connection.report(command.filePath, report);
    }


    private async createTestsContext(type: Type<object>): Promise<TestContext> {
        const context: TestContext = new TestContext(this._parentContext);

        context.scan(type);

        await context.initialize();
        await context.start();

        return context;
    }
}

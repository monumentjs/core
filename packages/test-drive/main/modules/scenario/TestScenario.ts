import {Type} from '@monument/core/main/Type';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {UnitFactory} from '@monument/context/main/unit/factory/UnitFactory';
import {MethodInvoker} from '@monument/context/main/unit/factory/support/MethodInvoker';
import {UnitRequest} from '@monument/context/main/unit/factory/UnitRequest';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Logger} from '@monument/logger/main/logger/Logger';
import {Ignore} from '../../decorators/Ignore';
import {Test} from '../../decorators/Test';
import {BeforeAll} from '../../decorators/BeforeAll';
import {AfterAll} from '../../decorators/AfterAll';
import {BeforeEach} from '../../decorators/BeforeEach';
import {AfterEach} from '../../decorators/AfterEach';


export class TestScenario {
    private readonly _testConstructor: Type<object>;
    private readonly _testClass: Class<object>;
    private readonly _isIgnored: boolean;
    private readonly _beforeAllMethods: ArrayList<Method> = new ArrayList();
    private readonly _afterAllMethods: ArrayList<Method> = new ArrayList();
    private readonly _beforeEachMethods: ArrayList<Method> = new ArrayList();
    private readonly _afterEachMethods: ArrayList<Method> = new ArrayList();
    private readonly _testMethods: ArrayList<Method> = new ArrayList();


    public constructor(testConstructor: Type<object>) {
        this._testConstructor = testConstructor;
        this._testClass = Class.of(testConstructor);
        this._isIgnored = this._testClass.isDecoratedWith(Ignore);

        const methods: ReadOnlyCollection<Method> = this._testClass.methods;

        for (const method of methods) {
            if (method.isDecoratedWith(Ignore)) {
                continue;
            }

            if (method.isDecoratedWith(Test)) {
                this._testMethods.add(method);
            }

            if (method.isDecoratedWith(BeforeAll)) {
                this._beforeAllMethods.add(method);
            }

            if (method.isDecoratedWith(AfterAll)) {
                this._afterAllMethods.add(method);
            }

            if (method.isDecoratedWith(BeforeEach)) {
                this._beforeEachMethods.add(method);
            }

            if (method.isDecoratedWith(AfterEach)) {
                this._afterEachMethods.add(method);
            }
        }
    }


    public async run(factory: UnitFactory, invoker: MethodInvoker, logger: Logger): Promise<void> {
        if (this._isIgnored) {
            return;
        }

        const instance: object = await factory.getUnit(this._testConstructor);

        for (const beforeAllMethod of this._beforeAllMethods) {
            await this.execute(invoker, instance, beforeAllMethod, logger);
        }

        for (const testMethod of this._testMethods) {
            for (const beforeEachMethod of this._beforeEachMethods) {
                await this.execute(invoker, instance, beforeEachMethod, logger);
            }

            await this.execute(invoker, instance, testMethod, logger);

            for (const afterEachMethod of this._afterEachMethods) {
                await this.execute(invoker, instance, afterEachMethod, logger);
            }
        }

        for (const afterAllMethod of this._afterAllMethods) {
            await this.execute(invoker, instance, afterAllMethod, logger);
        }
    }


    private async execute(invoker: MethodInvoker, instance: object, method: Method, logger: Logger): Promise<void> {
        const testClassName: string = this._testClass.name;

        try {
            await invoker.invoke(new UnitRequest(this._testClass.type), instance, method);
            await logger.info(`DONE: ${testClassName} > ${method.name}`);
        } catch (error) {
            await logger.error(`FAIL: ${testClassName} > ${method.name}`, error);
        }
    }
}

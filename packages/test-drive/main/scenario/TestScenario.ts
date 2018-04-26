import {Type} from '@monument/core/main/Type';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {Context} from '@monument/ioc/main/context/Context';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Test} from '../configuration/decorators/Test';
import {BeforeAll} from '../configuration/decorators/BeforeAll';
import {AfterAll} from '../configuration/decorators/AfterAll';
import {BeforeEach} from '../configuration/decorators/BeforeEach';
import {AfterEach} from '../configuration/decorators/AfterEach';
import {Ignore} from '../configuration/decorators/Ignore';


export class TestScenario {
    private readonly _testConstructor: Type<object>;
    private readonly _testClass: Class<object>;
    private readonly _isIgnored: boolean;
    private readonly _beforeAllMethods: ArrayList<Method> = new ArrayList();
    private readonly _afterAllMethods: ArrayList<Method> = new ArrayList();
    private readonly _beforeEachMethods: ArrayList<Method> = new ArrayList();
    private readonly _afterEachMethods: ArrayList<Method> = new ArrayList();
    private readonly _testMethods: ArrayList<Method> = new ArrayList();


    public get isIgnored(): boolean {
        return this._isIgnored;
    }


    public get beforeAllMethods(): ReadOnlyCollection<Method> {
        return this._beforeAllMethods;
    }


    public get afterAllMethods(): ReadOnlyCollection<Method> {
        return this._afterAllMethods;
    }


    public get beforeEachMethods(): ReadOnlyCollection<Method> {
        return this._beforeEachMethods;
    }


    public get afterEachMethods(): ReadOnlyCollection<Method> {
        return this._afterEachMethods;
    }


    public get testMethods(): ReadOnlyCollection<Method> {
        return this._testMethods;
    }


    public constructor(testConstructor: Type<object>) {
        this._testConstructor = testConstructor;
        this._testClass = Class.of(testConstructor);
        this._isIgnored = this._testClass.isDecoratedWith(Ignore);

        const methods: ReadOnlyCollection<Method> = this._testClass.methods;

        for (let method of methods) {
            if (!method.isDecoratedWith(Ignore)) {
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
    }


    public async run(context: Context): Promise<void> {
        if (this.isIgnored) {
            return;
        }

        const instance: object = await context.getUnit(this._testConstructor);

        for (let beforeAllMethod of this.beforeAllMethods) {
            await this.execute(beforeAllMethod, instance, context);
        }

        for (let testMethod of this.testMethods) {
            for (let beforeEachMethod of this.beforeEachMethods) {
                await this.execute(beforeEachMethod, instance, context);
            }

            await this.execute(testMethod, instance, context, true);

            for (let afterEachMethod of this.afterEachMethods) {
                await this.execute(afterEachMethod, instance, context);
            }
        }

        for (let afterAllMethod of this.afterAllMethods) {
            await this.execute(afterAllMethod, instance, context);
        }
    }


    private async execute(method: Method, instance: object, testsContext: Context, report: boolean = false) {
        const testClassName: string = this._testClass.name;
        let error: Error | undefined;

        try {
            await testsContext.invoke(method, instance);
        } catch (e) {
            error = e;
        }

            if (error == null) {
                console.log(`DONE: ${testClassName} > ${method.name}`);
            } else {
                console.error(`FAIL: ${testClassName} > ${method.name}\n`, error);
            }
    }
}

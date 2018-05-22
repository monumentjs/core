import {ArrayList} from '@monument/collections/main/ArrayList';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Ignore} from '../decorators/Ignore';
import {Test} from '../decorators/Test';
import {BeforeAll} from '../decorators/BeforeAll';
import {AfterAll} from '../decorators/AfterAll';
import {BeforeEach} from '../decorators/BeforeEach';
import {AfterEach} from '../decorators/AfterEach';


export class TestScenario {
    private readonly _isIgnored: boolean;
    private readonly _beforeAllMethods: ArrayList<Method> = new ArrayList();
    private readonly _afterAllMethods: ArrayList<Method> = new ArrayList();
    private readonly _beforeEachMethods: ArrayList<Method> = new ArrayList();
    private readonly _afterEachMethods: ArrayList<Method> = new ArrayList();
    private readonly _testMethods: ArrayList<Method> = new ArrayList();


    public get isIgnored(): boolean {
        return this._isIgnored;
    }


    public get beforeAllMethods(): ArrayList<Method> {
        return this._beforeAllMethods;
    }


    public get afterAllMethods(): ArrayList<Method> {
        return this._afterAllMethods;
    }


    public get beforeEachMethods(): ArrayList<Method> {
        return this._beforeEachMethods;
    }


    public get afterEachMethods(): ArrayList<Method> {
        return this._afterEachMethods;
    }


    public get testMethods(): ArrayList<Method> {
        return this._testMethods;
    }


    public constructor(testClass: Class<object>) {
        this._isIgnored = testClass.isDecoratedWith(Ignore);

        const methods: ReadOnlyCollection<Method> = testClass.methods;

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
}

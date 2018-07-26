import {Ignore} from '../decorators/Ignore';
import {Test} from '../decorators/Test';
import {BeforeAll} from '../decorators/BeforeAll';
import {AfterAll} from '../decorators/AfterAll';
import {BeforeEach} from '../decorators/BeforeEach';
import {AfterEach} from '../decorators/AfterEach';
import {ArrayList} from 'core/main/collection/mutable/ArrayList';
import {Method} from '@monument/core/main/reflection/Method';
import {ReadOnlyList} from 'core/main/collection/readonly/ReadOnlyList';
import {Class} from '@monument/core/main/reflection/Class';
import {TestCase} from './TestCase';
import {TestHook} from './TestHook';
import {Ignorable} from './Ignorable';
import {IgnoreDecorator} from '../decorators/IgnoreDecorator';
import {DisplayName} from '../decorators/DisplayName';
import {DisplayNameDecorator} from '../decorators/DisplayNameDecorator';


export class TestClass implements Ignorable {
    private readonly _class: Class<object>;
    private readonly _testCases: ArrayList<TestCase> = new ArrayList();
    private readonly _beforeAllHooks: ArrayList<TestHook> = new ArrayList();
    private readonly _afterAllHooks: ArrayList<TestHook> = new ArrayList();
    private readonly _beforeEachHooks: ArrayList<TestHook> = new ArrayList();
    private readonly _afterEachHooks: ArrayList<TestHook> = new ArrayList();
    private readonly _displayName: string;

    public get class(): Class<object> {
        return this._class;
    }


    public get displayName(): string {
        return this._displayName;
    }


    public get isIgnored(): boolean {
        return this._class.isDecoratedWith(Ignore);
    }


    public get reasonOfIgnore(): string | undefined {
        return this._class.getAttribute(IgnoreDecorator.REASON);
    }


    public get beforeAllHooks(): ReadOnlyList<TestHook> {
        return this._beforeAllHooks;
    }


    public get afterAllHooks(): ReadOnlyList<TestHook> {
        return this._afterAllHooks;
    }


    public get beforeEachHooks(): ReadOnlyList<TestHook> {
        return this._beforeEachHooks;
    }


    public get afterEachHooks(): ReadOnlyList<TestHook> {
        return this._afterEachHooks;
    }


    public get testCases(): ReadOnlyList<TestCase> {
        return this._testCases;
    }


    public constructor(klass: Class<object>) {
        this._class = klass;

        this._displayName = klass.name;

        if (klass.isDecoratedWith(DisplayName)) {
            const displayName: string | undefined = klass.getAttribute(DisplayNameDecorator.NAME);

            if (displayName) {
                this._displayName = displayName;
            }
        }

        const methods: ReadOnlyList<Method> = klass.methods;

        for (const method of methods) {
            if (method.isDecoratedWith(Test)) {
                this._testCases.add(new TestCase(method));
            }

            if (method.isDecoratedWith(BeforeAll)) {
                this._beforeAllHooks.add(new TestHook(method));
            }

            if (method.isDecoratedWith(AfterAll)) {
                this._afterAllHooks.add(new TestHook(method));
            }

            if (method.isDecoratedWith(BeforeEach)) {
                this._beforeEachHooks.add(new TestHook(method));
            }

            if (method.isDecoratedWith(AfterEach)) {
                this._afterEachHooks.add(new TestHook(method));
            }
        }
    }
}

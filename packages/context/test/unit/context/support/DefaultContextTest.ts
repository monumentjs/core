import {ArrayList} from '@monument/collections/main/ArrayList';
import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {AfterEach} from '@monument/test-drive/main/decorators/AfterEach';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Init} from '@monument/decorators/main/stereotype/lifecycle/Init';
import {Destroy} from '@monument/decorators/main/stereotype/lifecycle/Destroy';
import {Service} from '@monument/decorators/main/stereotype/Service';
import {Singleton} from '@monument/decorators/main/stereotype/Singleton';
import {Component} from '@monument/decorators/main/stereotype/Component';
import {PreDestroy} from '@monument/decorators/main/stereotype/lifecycle/PreDestroy';
import {Injectable} from '@monument/decorators/main/base/Injectable';
import {PostConstruct} from '@monument/decorators/main/stereotype/lifecycle/PostConstruct';
import {DefaultContext} from '../../../../main/context/support/DefaultContext';
import {NoSuchUnitDefinitionException} from '../../../../main/unit/NoSuchUnitDefinitionException';


class Unregistered {

}


@Singleton
class Arg {

}


@Injectable
class Example {
    public initCalls: ArrayList<IArguments> = new ArrayList();
    public postConstructCalls: ArrayList<IArguments> = new ArrayList();
    public preDestroyCalls: ArrayList<IArguments> = new ArrayList();
    public destroyCalls: ArrayList<IArguments> = new ArrayList();


    @PostConstruct
    public postConstruct(arg: Arg) {
        this.postConstructCalls.add(arguments);
    }


    @Init
    public init(arg: Arg) {
        this.initCalls.add(arguments);
    }


    @PreDestroy
    public preDestroy(arg: Arg) {
        this.preDestroyCalls.add(arguments);
    }


    @Destroy
    public destroy(arg: Arg) {
        this.destroyCalls.add(arguments);
    }
}


@Singleton
class SingletonExample extends Example {

}


@Component
class ComponentExample extends Example {

}


@Service
class ServiceExample extends Example {

}


export class DefaultContextTest {
    private parent!: DefaultContext;
    private context!: DefaultContext;


    @BeforeEach
    public async setup() {
        this.parent = new DefaultContext();
        this.context = new DefaultContext(this.parent);

        this.parent.scan(Arg);
        this.context.scan(Example);
        this.context.scan(ComponentExample);
        this.context.scan(SingletonExample);
        this.context.scan(ServiceExample);

        await this.context.initialize();
        await this.context.start();
    }


    @AfterEach
    public async cleanup() {
        await this.context.stop();
    }


    @Test
    public async 'getUnit() throws NoSuchUnitDefinitionException for unregistered units'(assert: Assert) {
        await assert.throws(async () => {
            await this.context.getUnit(Unregistered);
        }, NoSuchUnitDefinitionException);

        await assert.throws(async () => {
            await this.parent.getUnit(SingletonExample);
        }, NoSuchUnitDefinitionException);

        await assert.throws(async () => {
            await this.parent.getUnit(ComponentExample);
        }, NoSuchUnitDefinitionException);

        await assert.throws(async () => {
            await this.parent.getUnit(ServiceExample);
        }, NoSuchUnitDefinitionException);
    }


    @Test
    public async 'getUnit() returns new instance for simple units'(assert: Assert) {
        const a = await this.context.getUnit(Example);
        const b = await this.context.getUnit(Example);

        assert.true(a !== b);
    }


    @Test
    public async 'getUnit() returns the same instance for singleton units'(assert: Assert) {
        const a = await this.context.getUnit(SingletonExample);
        const b = await this.context.getUnit(SingletonExample);

        assert.true(a === b);
    }


    @Test
    public async 'getUnit() returns the same instance for component units'(assert: Assert) {
        const a = await this.context.getUnit(ComponentExample);
        const b = await this.context.getUnit(ComponentExample);

        assert.true(a === b);
    }


    @Test
    public async 'getUnit() returns the same instance for service units'(assert: Assert) {
        const a = await this.context.getUnit(ServiceExample);
        const b = await this.context.getUnit(ServiceExample);

        assert.true(a === b);
    }


    @Test
    public async 'lifecycle methods calls'(assert: Assert) {
        const service: ServiceExample = await this.context.getUnit(ServiceExample);
        const arg: Arg = await this.context.getUnit(Arg);

        assert.equals(service.initCalls.length, 1);
        assert.equals(service.initCalls.getAt(0)[0], arg);
        assert.equals(service.postConstructCalls.length, 1);
        assert.equals(service.postConstructCalls.getAt(0)[0], arg);
        assert.equals(service.preDestroyCalls.length, 0);
        assert.equals(service.destroyCalls.length, 0);

        await this.context.destroyUnit(ServiceExample, service);

        assert.equals(service.initCalls.length, 1);
        assert.equals(service.postConstructCalls.length, 1);
        assert.equals(service.preDestroyCalls.length, 1);
        assert.equals(service.preDestroyCalls.getAt(0)[0], arg);
        assert.equals(service.destroyCalls.length, 1);
        assert.equals(service.destroyCalls.getAt(0)[0], arg);
    }
}

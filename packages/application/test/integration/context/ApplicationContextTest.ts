import {Disposable} from '@monument/core/main/Disposable';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {AbstractLifecycle} from '@monument/core/main/lifecycle/AbstractLifecycle';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {ListMap} from '@monument/collections/main/ListMap';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {BeforeAll} from '@monument/test-drive/main/decorators/BeforeAll';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Application} from '@monument/stereotype/main/Application';
import {Module} from '@monument/stereotype/main/Module';
import {Service} from '@monument/stereotype/main/Service';
import {Lazy} from '@monument/stereotype/main/Lazy';
import {Init} from '@monument/stereotype/main/Init';
import {Unit} from '@monument/stereotype/main/Unit';
import {PostConstruct} from '@monument/stereotype/main/PostConstruct';
import {PreDestroy} from '@monument/stereotype/main/PreDestroy';
import {Destroy} from '@monument/stereotype/main/Destroy';
import {ApplicationContext} from '../../../main/context/ApplicationContext';
import {Configuration} from '@monument/stereotype/main/Configuration';


interface PhoneCodeProvider {
    getAllCodes(): Promise<ReadOnlyMap<string, string>>;
}


@Service
class PhoneCodeProviderImpl implements PhoneCodeProvider {

    public async getAllCodes(): Promise<ReadOnlyMap<string, string>> {
        let codes: ListMap<string, string> = new ListMap();

        codes.put('UA', '+380');
        codes.put('US', '+1');

        return codes;
    }
}


@Service
class PhoneCodeRegistry {
    private readonly _codes: ReadOnlyMap<string, string>;


    public get length(): number {
        return this._codes.length;
    }


    public constructor(codes: ReadOnlyMap<string, string>) {
        this._codes = codes;
    }


    public get(countryCode: string): string | undefined {
        return this._codes.get(countryCode);
    }
}


@Service
@Lazy
class PhoneCallProcess {
    public apiLoaded: boolean = false;


    @Init
    public async loadAPI() {
        this.apiLoaded = true;
    }
}


@Configuration
class PhoneCodeRegistryConfiguration {
    private readonly _phoneCodeProvider: PhoneCodeProviderImpl;


    public constructor(
        phoneCodeProvider: PhoneCodeProviderImpl
    ) {
        this._phoneCodeProvider = phoneCodeProvider;
    }


    @Unit(PhoneCodeRegistry)
    public async phoneCodeRegistry(): Promise<PhoneCodeRegistry> {
        const codes: ReadOnlyMap<string, string> = await this._phoneCodeProvider.getAllCodes();

        return new PhoneCodeRegistry(codes);
    }
}


@Module({
    components: [
        PhoneCallProcess,
        PhoneCodeRegistry,
        PhoneCodeProviderImpl
    ]
})
class PhoneCodeModule {

}


@Module({
    components: [
        PhoneCodeRegistryConfiguration
    ]
})
class ConfigurationModule {

}


@Application({
    modules: [
        PhoneCodeModule,
        ConfigurationModule
    ]
})
class PhoneApplication extends AbstractLifecycle implements Disposable {
    public isDisposed: boolean = false;
    public phoneCodeRegistry: PhoneCodeRegistry;
    public postConstructCalls: ArrayList<string> = new ArrayList();


    public constructor(phoneCodeRegistry: PhoneCodeRegistry) {
        super();

        this.phoneCodeRegistry = phoneCodeRegistry;
    }


    @PostConstruct
    public validate(): void {
        if (this.phoneCodeRegistry.length === 0) {
            throw new Exception('Phone code registry cannot be empty.');
        }

        this.postConstructCalls.add('validate');
    }


    @PostConstruct
    public initialize(): Promise<void> {
        this.postConstructCalls.add('initialize');

        return super.initialize();
    }


    @Init
    public start(): Promise<void> {
        return super.start();
    }


    @PreDestroy
    public stop(): Promise<void> {
        return super.stop();
    }


    @Destroy
    public dispose(): void {
        this.isDisposed = true;
    }
}


export class ApplicationContextTest {
    private readonly _context: ApplicationContext = new ApplicationContext();


    @BeforeAll
    public async setup() {
        this._context.scan(PhoneApplication);

        await this._context.initialize();
        await this._context.start();
    }


    @Test
    public async 'provides fully configured instances of specified class'(assert: Assert) {
        let app: PhoneApplication = await this._context.getUnit(PhoneApplication);

        assert.true(app.isInitialized);
        assert.true(app.isStarted);
        assert.false(app.isDisposed);
        assert.true(app.postConstructCalls.contains('validate'));
        assert.true(app.postConstructCalls.contains('initialize'));

        assert.equals(app.phoneCodeRegistry.length, 2);
        assert.equals(app.phoneCodeRegistry.get('UA'), '+380');
        assert.equals(app.phoneCodeRegistry.get('US'), '+1');
    }


    @Test
    public async 'returns the same instance for singleton units'(assert: Assert) {
        const first = await this._context.getUnit(PhoneApplication);
        let second = await this._context.getUnit(PhoneApplication);

        assert.equals(first, second);
    }
}


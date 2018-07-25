import {ReadOnlyMap} from '@monument/core/main/collection/ReadOnlyMap';
import {Service} from '@monument/core/main/stereotype/Service';
import {ListMap} from '@monument/core/main/collection/ListMap';
import {Lazy} from '@monument/core/main/stereotype/configuration/Lazy';
import {Init} from '@monument/core/main/stereotype/lifecycle/Init';
import {Configuration} from '@monument/core/main/stereotype/Configuration';
import {Unit} from '@monument/core/main/stereotype/Unit';
import {Module} from '@monument/core/main/stereotype/Module';
import {Application} from '@monument/core/main/stereotype/Application';
import {AbstractLifecycle} from '@monument/core/main/lifecycle/AbstractLifecycle';
import {Disposable} from '@monument/core/main/Disposable';
import {ArrayList} from '@monument/core/main/collection/ArrayList';
import {PostConstruct} from '@monument/core/main/stereotype/lifecycle/PostConstruct';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {PreDestroy} from '@monument/core/main/stereotype/lifecycle/PreDestroy';
import {Destroy} from '@monument/core/main/stereotype/lifecycle/Destroy';
import {ApplicationContext} from '@monument/core/main/application/context/ApplicationContext';
import {BeforeAll} from '@monument/test-drive/main/decorators/BeforeAll';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';


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


import {Disposable} from '@monument/core/main/Disposable';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {ListMap} from '@monument/collections/main/ListMap';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Service} from '@monument/ioc/main/stereotype/Service';
import {Unit} from '@monument/ioc/main/stereotype/Unit';
import {DefaultType} from '@monument/ioc/main/unit/configuration/decorators/DefaultType';
import {ConfigurableContext} from '@monument/ioc/main/context/ConfigurableContext';
import {Init} from '@monument/ioc/main/unit/configuration/decorators/Init';
import {PostConstruct} from '@monument/ioc/main/unit/configuration/decorators/PostConstruct';
import {Lifecycle} from '@monument/ioc/main/context/Lifecycle';
import {PreDestroy} from '@monument/ioc/main/unit/configuration/decorators/PreDestroy';
import {Lazy} from '@monument/ioc/main/unit/configuration/decorators/Lazy';
import {Application} from '../../../main/decorators/Application';
import {Module} from '../../../main/decorators/Module';
import {ApplicationContext} from '../../../main/context/ApplicationContext';


interface PhoneCodeProvider {
    getAllCodes(): Promise<ReadOnlyMap<string, string>>;
}


@Service()
class PhoneCodeProviderImpl implements PhoneCodeProvider {

    public async getAllCodes(): Promise<ReadOnlyMap<string, string>> {
        let codes: ListMap<string, string> = new ListMap();

        codes.put('UA', '+380');
        codes.put('US', '+1');

        return codes;
    }
}


@Service()
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


@Service()
@Lazy()
class PhoneCallProcess {
    public apiLoaded: boolean = false;


    @Init()
    public async loadAPI() {
        this.apiLoaded = true;
    }
}


@Module({
    exports: [
        PhoneCallProcess,
        PhoneCodeRegistry,
        PhoneCodeProviderImpl
    ]
})
class PhoneCodeModule {
    private readonly _phoneCodeProvider: PhoneCodeProvider;


    public constructor(
        @DefaultType(PhoneCodeProviderImpl) phoneCodeProvider: PhoneCodeProvider
    ) {
        this._phoneCodeProvider = phoneCodeProvider;
    }


    @Unit(PhoneCodeRegistry)
    public async getPhoneCodeRegistry(): Promise<PhoneCodeRegistry> {
        let codes = await this._phoneCodeProvider.getAllCodes();

        return new PhoneCodeRegistry(codes);
    }
}


@Application({
    modules: [
        PhoneCodeModule
    ]
})
class PhoneApplication implements Lifecycle, Disposable {
    public phoneCodeRegistry: PhoneCodeRegistry;
    public isInitialized = false;
    public isDisposed = false;
    public postConstructCalls = new ArrayList();
    public isRunning: boolean = false;


    public constructor(phoneCodeRegistry: PhoneCodeRegistry) {
        this.phoneCodeRegistry = phoneCodeRegistry;
    }


    @PostConstruct()
    public validate() {
        if (this.phoneCodeRegistry.length === 0) {
            throw new Exception('Phone code registry cannot be empty.');
        }

        this.postConstructCalls.add('validate');
    }


    @PostConstruct()
    public async start() {
        this.isRunning = true;

        this.postConstructCalls.add('start');
    }


    @Init()
    public initialize() {
        this.isInitialized = true;
    }


    @PreDestroy()
    public async stop() {
        this.isRunning = false;
    }


    public async dispose() {
        this.isDisposed = true;
    }
}


describe('ApplicationContext', () => {
    let context: ConfigurableContext;

    beforeAll(async () => {
        context = new ApplicationContext();
        context.scan(PhoneApplication);

        await context.start();
    });

    it(`provides fully configured instances of specified class`, async () => {
        let app: PhoneApplication = await context.getUnit(PhoneApplication);

        expect(app.isRunning).toBe(true);
        expect(app.isInitialized).toBe(true);
        expect(app.isDisposed).toBe(false);
        expect(app.postConstructCalls.contains('validate')).toBe(true);
        expect(app.postConstructCalls.contains('start')).toBe(true);

        expect(app).toBeInstanceOf(PhoneApplication);
        expect(app.phoneCodeRegistry).toBeInstanceOf(PhoneCodeRegistry);
        expect(app.phoneCodeRegistry.length).toBe(2);
        expect(app.phoneCodeRegistry.get('UA')).toBe('+380');
        expect(app.phoneCodeRegistry.get('US')).toBe('+1');
    });

    it(`returns the same instance for singleton units`, async () => {
        let first = await context.getUnit(PhoneApplication);
        let second = await context.getUnit(PhoneApplication);

        expect(first).toBe(second);
    });
});


import {ReadOnlyMap} from '@monument/collections-core/main/ReadOnlyMap';
import {ListMap} from '@monument/collections/main/ListMap';
import {Service} from '@monument/ioc/main/stereotype/Service';
import {Unit} from '@monument/ioc/main/stereotype/Unit';
import {ConfigurableContext} from '@monument/ioc/main/context/ConfigurableContext';
import {Application} from '../../../main/decorators/Application';
import {Module} from '../../../main/decorators/Module';
import {ApplicationContext} from '../../../main/context/ApplicationContext';
import {DefaultType} from '@monument/ioc/main/unit/configuration/decorators/DefaultType';


interface PhoneCodeProvider {
    getAllCodes(): Promise<ReadOnlyMap<string, string>>;
}


@Service()
class PhoneCodeProviderImpl implements PhoneCodeProvider {

    public async getAllCodes(): Promise<ReadOnlyMap<string, string>> {
        let codes: ListMap<string, string> = new ListMap();

        codes.put('UA', '+380');

        return codes;
    }
}


@Service()
class PhoneCodeRegistry {
    private readonly _codes: ReadOnlyMap<string, string>;


    public constructor(codes: ReadOnlyMap<string, string>) {
        this._codes = codes;
    }


    public get(countryCode: string): string | undefined {
        return this._codes.get(countryCode);
    }
}


@Module({
    exports: [
        PhoneCodeRegistry,
        PhoneCodeProviderImpl
    ]
})
class PhoneCodeModule {
    private readonly _phoneCodeProvider: PhoneCodeProvider;


    public constructor(
        @DefaultType(PhoneCodeProviderImpl)
        phoneCodeProvider: PhoneCodeProvider
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
    imports: [
        PhoneCodeModule
    ]
})
class PhoneApplication {
    private readonly _phoneCodeRegistry: PhoneCodeRegistry;

    public get phoneCodeRegistry(): PhoneCodeRegistry {
        return this._phoneCodeRegistry;
    }


    public constructor(phoneCodeRegistry: PhoneCodeRegistry) {
        this._phoneCodeRegistry = phoneCodeRegistry;
    }
}


describe('ApplicationContext', () => {
    let context: ConfigurableContext;

    beforeAll(async () => {
        context = new ApplicationContext();
        context.scan(PhoneApplication);

        await context.start();
    });

    it(`creates instances of specified class`, async () => {
        let app: PhoneApplication = await context.getUnit(PhoneApplication);

        expect(app).toBeInstanceOf(PhoneApplication);
        expect(app.phoneCodeRegistry).toBeInstanceOf(PhoneCodeRegistry);
        expect(app.phoneCodeRegistry.get('UA')).toBe('+380');
    });
});


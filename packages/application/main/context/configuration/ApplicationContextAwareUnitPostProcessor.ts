import {Type} from '@monument/core/main/Type';
import {UnitPostProcessor} from '@monument/ioc/main/unit/factory/configuration/UnitPostProcessor';
import {ApplicationContext} from '../ApplicationContext';


export class ApplicationContextAwareUnitPostProcessor implements UnitPostProcessor {
    private readonly _context: ApplicationContext;


    public constructor(context: ApplicationContext) {
        this._context = context;
    }


    public async postProcessBeforeInitialization<T extends object>(instance: any, unitType: Type<T>): Promise<T> {
        if (typeof instance.setApplicationContext === 'function') {
            instance.setApplicationContext(this._context);
        }

        return instance;
    }


    public async postProcessAfterInitialization<T extends object>(instance: T, unitType: Type<T>): Promise<T> {
        return instance;
    }
}

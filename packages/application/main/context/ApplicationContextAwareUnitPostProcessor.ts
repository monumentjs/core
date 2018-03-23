import {UnitPostProcessor} from '@monument/ioc/main/unit/factory/configuration/UnitPostProcessor';
import {UnitDefinition} from '@monument/ioc/main/unit/definition/UnitDefinition';
import {UnitException} from '@monument/ioc/main/unit/UnitException';
import {ApplicationContext} from './ApplicationContext';
import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';


export class ApplicationContextAwareUnitPostProcessor implements UnitPostProcessor {
    private readonly _context: ApplicationContext;


    public constructor(context: ApplicationContext) {
        this._context = context;
    }


    public async postProcessBeforeInitialization<T extends object>(instance: T, unitType: Type<T>): Promise<T> {
        let klass = Class.of(unitType);

        if (klass.isDecoratedWith()) {
            if ('setApplicationContext' in instance && typeof instance.setApplicationContext !== 'function') {
                throw new UnitException(`Unit marked as application context aware but does not implement IApplicationContextAware interface.`);
            }

            (instance as any).setApplicationContext(this._context);
        }

        return instance;
    }


    public async postProcessAfterInitialization<T extends object>(instance: T, unitType: Type<T>): Promise<T> {
        return instance;
    }
}

import {IUnitPostProcessor} from '../Abstraction/IUnitPostProcessor';
import {UnitDefinition} from '../UnitDefinition';
import {CoreType} from '../../../Core/Types/CoreType';
import {UnitException} from '../UnitException';
import {IApplicationContextAware} from '../Abstraction/IApplicationContextAware';
import {IApplicationContext} from '../Abstraction/IApplicationContext';


export class ApplicationContextAwareUnitPostProcessor implements IUnitPostProcessor {
    private _context: IApplicationContext;


    public constructor(context: IApplicationContext) {
        this._context = context;
    }


    public postProcessBeforeInitialization<T>(unit: any, unitDefinition: UnitDefinition<T>): T {
        if (unitDefinition.isApplicationContextAware) {
            if (typeof (unit as IApplicationContextAware).setApplicationContext !== CoreType.Function) {
                throw new UnitException(`Unit marked as application context aware but does not implement IApplicationContextAware interface.`);
            }

            (unit as IApplicationContextAware).setApplicationContext(this._context);
        }

        return unit;
    }


    public postProcessAfterInitialization<T>(unit: T, unitDefinition: UnitDefinition<T>): T {
        return unit;
    }
}

import {IUnitPostProcessor} from '../Abstraction/IUnitPostProcessor';
import {UnitDefinition} from '../UnitDefinition';
import {UnitException} from '../UnitException';
import {CoreType} from '../../../Core/Types/CoreType';
import {IUnitNameAware} from '../Abstraction/IUnitNameAware';


export class UnitNameAwareUnitPostProcessor implements IUnitPostProcessor {
    public postProcessBeforeInitialization<T>(unit: any, unitDefinition: UnitDefinition<T>): T {
        if (unitDefinition.isUnitNameAware) {
            if (typeof (unit as IUnitNameAware).setUnitName !== CoreType.Function) {
                throw new UnitException(`Unit marked as unit name aware but does not implement IUnitNameAware interface.`);
            }

            (unit as IUnitNameAware).setUnitName(unitDefinition.name);
        }

        return unit;
    }


    public postProcessAfterInitialization<T>(unit: T, unitDefinition: UnitDefinition<T>): T {
        return unit;
    }
}

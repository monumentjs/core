import {IUnitPostProcessor} from '../Abstraction/IUnitPostProcessor';
import {UnitDefinition} from '../UnitDefinition';
import {UnitException} from '../UnitException';
import {CoreType} from '../../../Core/Types/CoreType';
import {IUnitFactoryAware} from '../Abstraction/IUnitFactoryAware';
import {IUnitFactory} from '../Abstraction/IUnitFactory';


export class UnitFactoryAwareUnitPostProcessor implements IUnitPostProcessor {
    private _unitFactory: IUnitFactory;


    public constructor(unitFactory: IUnitFactory) {
        this._unitFactory = unitFactory;
    }


    public postProcessBeforeInitialization<T>(unit: any, unitDefinition: UnitDefinition<T>): T {
        if (unitDefinition.isUnitFactoryAware) {
            if (typeof (unit as IUnitFactoryAware).setUnitFactory !== CoreType.Function) {
                throw new UnitException(`Unit marked as unit factory aware but does not implement IUnitFactoryAware interface.`);
            }

            (unit as IUnitFactoryAware).setUnitFactory(this._unitFactory);
        }

        return unit;
    }


    public postProcessAfterInitialization<T>(unit: T, unitDefinition: UnitDefinition<T>): T {
        return unit;
    }
}

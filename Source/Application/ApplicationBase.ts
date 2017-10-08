import {IApplicationEntryPoint} from './Abstraction/IApplicationEntryPoint';
import {IUnitFactoryAware} from '../DI/Unit/Abstraction/IUnitFactoryAware';
import {IUnitFactory} from '../DI/Unit/Abstraction/IUnitFactory';
import {UnitFactoryAware} from '../DI/Decorators/UnitFactoryAware';


@UnitFactoryAware()
export abstract class ApplicationBase implements IApplicationEntryPoint, IUnitFactoryAware {
    private _unitFactory: IUnitFactory;


    protected get unitFactory(): IUnitFactory {
        return this._unitFactory;
    }


    public abstract main(): Promise<void>;


    public setUnitFactory(unitFactory: IUnitFactory): void {
        this._unitFactory = unitFactory;
    }
}

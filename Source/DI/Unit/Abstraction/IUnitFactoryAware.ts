import {IUnitFactory} from './IUnitFactory';


export interface IUnitFactoryAware {
    setUnitFactory(unitFactory: IUnitFactory): void;
}

import {Constructor} from '../../types';
import {UnitFactoryFunction} from '../Decorators/types';
import {IUnitConfiguration} from '../Decorators/IUnitConfiguration';
import {Assert} from '../../Assertion/Assert';


export class UnitProviderConfiguration<T> {
    public readonly isSingleton: boolean;
    public readonly type: Constructor<T>;
    public readonly factory: UnitFactoryFunction<T>;
    public readonly providers: Array<Constructor<any>>;


    public constructor(type: Constructor<T>, configuration: IUnitConfiguration<T>) {
        Assert.argument('type', type).notNull();
        Assert.argument('configuration', configuration).notNull();

        const {isSingleton, providers, factory} = configuration;

        this.isSingleton = isSingleton || false;
        this.type = type;
        this.providers = providers || [];
        this.factory = factory || null;
    }
}

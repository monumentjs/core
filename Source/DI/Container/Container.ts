import {Constructor} from '../../types';
import {Assert} from '../../Assertion/Assert';
import {UnitProvider} from '../Providers/UnitProvider';
import {Singleton} from '../Decorators/Singleton';
import {IUnitProviderResolver} from './IUnitProviderResolver';
import {List} from '../../Collections/List';
import {UnitBuilder} from './UnitBuilder';


@Singleton({
    factory(): Container {
        return Container.instance;
    }
})
export class Container {
    private static get instance(): Container {
        if (this._instance == null) {
            this._instance = new Container();
        }

        return this._instance;
    }


    public static get<T>(type: Constructor<T>): T {
        return this.instance.get(type);
    }


    public static addUnitProviderResolver(unitProviderResolver: IUnitProviderResolver): void {
        return this.instance.addUnitProviderResolver(unitProviderResolver);
    }


    public static removeUnitProviderResolver(unitProviderResolver: IUnitProviderResolver): boolean {
        return this.instance.removeUnitProviderResolver(unitProviderResolver);
    }


    public static removeAllUnitProviderResolvers(): void {
        this.instance.removeAllUnitProviderResolvers();
    }


    private static _instance: Container;


    private unitBuilder: UnitBuilder = new UnitBuilder(this);
    private unitProviderResolvers: List<IUnitProviderResolver> = new List();


    protected constructor() {

    }


    public addUnitProviderResolver(unitProviderResolver: IUnitProviderResolver): void {
        Assert.argument('unitProviderResolver', unitProviderResolver).notNull();

        this.unitProviderResolvers.add(unitProviderResolver);
    }


    public removeUnitProviderResolver(unitProviderResolver: IUnitProviderResolver): boolean {
        Assert.argument('unitProviderResolver', unitProviderResolver).notNull();

        return this.unitProviderResolvers.remove(unitProviderResolver);
    }


    public removeAllUnitProviderResolvers(): void {
        this.unitProviderResolvers.clear();
    }


    public get<T>(type: Constructor<T>): T {
        Assert.argument('type', type).notNull();

        return this.getUnitFromExtensions(type) || this.getOriginalUnit(type);
    }


    private getOriginalUnit<T>(type: Constructor<T>): T {
        return this.unitBuilder.createUnit(type);
    }


    private getUnitFromExtensions<T>(type: Constructor<T>): T {
        let provider: UnitProvider<T>;
        let extensionWithProvider: IUnitProviderResolver = this.getExtensionByTypeProvider(type);

        if (extensionWithProvider) {
            provider = extensionWithProvider.getProvider(type);

            return this.unitBuilder.createUnitFromProvider(provider);
        }

        return null;
    }


    private getExtensionByTypeProvider<T>(type: Constructor<T>): IUnitProviderResolver {
        return this.unitProviderResolvers.first((extension: IUnitProviderResolver): boolean => {
            return extension.hasProvider(type);
        });
    }


}

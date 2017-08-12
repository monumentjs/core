import {Constructor} from '../../types';
import {Assert} from '../../Assertion/Assert';
import {IEnumerable} from '../../Collections/IEnumerable';
import {List} from '../../Collections/List';
import {UnitProvider} from '../Providers/UnitProvider';
import {IContainerProxy} from './IContainerProxy';
import {UnitBuilder} from './UnitBuilder';
import {ClosureBuilder} from './ClosureBuilder';
import {Singleton} from '../Decorators/Singleton';


@Singleton({
    factory(): Container {
        return Container.instance;
    }
})
export class Container {
    private static _instance: Container;


    private static get instance(): Container {
        if (this._instance == null) {
            this._instance = new Container();
        }

        return this._instance;
    }


    public static get<T>(type: Constructor<T>): T {
        return this.instance.get(type);
    }


    public static createClosure<TFunc extends Function>(providers: IEnumerable<Constructor<any>>, func: TFunc): TFunc {
        return this.instance.createClosure(providers, func);
    }


    public static call<TFunc extends Function>(providers: IEnumerable<Constructor<any>>, func: TFunc): TFunc {
        return this.instance.call(providers, func);
    }


    public static addUnitProviderResolver(unitProviderResolver: IContainerProxy): void {
        return this.instance.addUnitProviderResolver(unitProviderResolver);
    }


    public static removeUnitProviderResolver(unitProviderResolver: IContainerProxy): boolean {
        return this.instance.removeUnitProviderResolver(unitProviderResolver);
    }


    public static removeAllUnitProviderResolvers(): void {
        this.instance.removeAllUnitProviderResolvers();
    }


    private closureBuilder: ClosureBuilder = ClosureBuilder.instance;
    private unitBuilder: UnitBuilder = UnitBuilder.instance;
    private unitProviderResolvers: List<IContainerProxy> = new List();


    protected constructor() {

    }


    public addUnitProviderResolver(unitProviderResolver: IContainerProxy): void {
        Assert.argument('unitProviderResolver', unitProviderResolver).notNull();

        this.unitProviderResolvers.add(unitProviderResolver);
    }


    public removeUnitProviderResolver(unitProviderResolver: IContainerProxy): boolean {
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


    public createClosure<TFunc extends Function>(providers: IEnumerable<Constructor<any>>, fn: TFunc): TFunc {
        return this.closureBuilder.createClosure(this, providers, fn);
    }


    public call<TFunc extends Function>(providers: IEnumerable<Constructor<any>>, fn: TFunc): TFunc {
        return this.createClosure(providers, fn)();
    }


    private getOriginalUnit<T>(type: Constructor<T>): T {
        return this.unitBuilder.createUnit(this, type);
    }


    private getUnitFromExtensions<T>(type: Constructor<T>): T {
        let provider: UnitProvider<T>;
        let extensionWithProvider: IContainerProxy = this.getExtensionByTypeProvider(type);

        if (extensionWithProvider) {
            provider = extensionWithProvider.getProvider(type);

            return this.unitBuilder.createUnitFromProvider(this, provider);
        }

        return null;
    }


    private getExtensionByTypeProvider<T>(type: Constructor<T>): IContainerProxy {
        return this.unitProviderResolvers.first((extension: IContainerProxy): boolean => {
            return extension.hasProvider(type);
        });
    }


}

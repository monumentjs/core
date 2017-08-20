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


    public static addProxy(proxy: IContainerProxy): void {
        return this.instance.addProxy(proxy);
    }


    public static removeProxy(proxy: IContainerProxy): boolean {
        return this.instance.removeProxy(proxy);
    }


    public static removeAllProxies(): void {
        this.instance.removeAllProxies();
    }


    private closureBuilder: ClosureBuilder = ClosureBuilder.instance;
    private unitBuilder: UnitBuilder = UnitBuilder.instance;
    private containerProxies: List<IContainerProxy> = new List();


    protected constructor() {

    }


    public addProxy(proxy: IContainerProxy): void {
        Assert.argument('proxy', proxy).notNull();

        this.containerProxies.add(proxy);
    }


    public removeProxy(proxy: IContainerProxy): boolean {
        Assert.argument('proxy', proxy).notNull();

        return this.containerProxies.remove(proxy);
    }


    public removeAllProxies(): void {
        this.containerProxies.clear();
    }


    public get<T>(type: Constructor<T>): T {
        Assert.argument('type', type).notNull();

        return this.getUnitFromProxies(type) || this.getOriginalUnit(type);
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


    private getUnitFromProxies<T>(type: Constructor<T>): T | null {
        let provider: UnitProvider<T>;
        let extensionWithProvider: IContainerProxy | null = this.findProxyByType(type);

        if (extensionWithProvider == null) {
            return null;
        }

        provider = extensionWithProvider.getProvider(type);

        return this.unitBuilder.createUnitFromProvider(this, provider);
    }


    private findProxyByType<T>(type: Constructor<T>): IContainerProxy | null {
        return this.containerProxies.first((extension: IContainerProxy): boolean => {
            return extension.hasProvider(type);
        });
    }
}

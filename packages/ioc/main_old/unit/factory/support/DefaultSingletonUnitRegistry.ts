import {ReadOnlyMap} from '@monument/collections-core/main/ReadOnlyMap';
import {Map} from '@monument/collections-core/main/Map';
import {SingletonUnitRegistry} from '../configuration/SingletonUnitRegistry';
import {ListMap} from '@monument/collections/main/ListMap';


export class DefaultSingletonUnitRegistry implements SingletonUnitRegistry {
    private readonly _registeredSingletons: Map<string, object> = new ListMap();


    public get registeredSingletons(): ReadOnlyMap<string, object> {
        return this._registeredSingletons;
    }


    public get singletonCount(): number {
        return this._registeredSingletons.length;
    }


    public containsSingleton(unitName: string): boolean {
        return this._registeredSingletons.containsKey(unitName);
    }


    public getSingleton(unitName: string): object | undefined {
        return this._registeredSingletons.get(unitName);
    }


    public registerSingleton(unitName: string, unitObject: object): void {
        this._registeredSingletons.put(unitName, unitObject);
    }

}

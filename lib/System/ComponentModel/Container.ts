import {IDisposable} from '../../Core/types';
import {IContainer} from './IContainer';
import {IComponent} from './IComponent';
import ComponentCollection from './ComponentCollection';


export default class Container implements IContainer, IDisposable {
    private _components: ComponentCollection = new ComponentCollection();
    private _isDisposed: boolean = false;


    public get components(): ComponentCollection {
        return this._components;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public add(component: IComponent): void {
        this._components = this._components.add(component);
    }


    public remove(component: IComponent): void {
        this._components = this._components.remove(component);
    }


    public dispose(): void {
        this._isDisposed = true;
    }
}

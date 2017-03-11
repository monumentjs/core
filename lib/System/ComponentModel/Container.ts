import {IDisposable} from '../../Core/types';
import {IContainer} from './IContainer';
import {IComponent} from './IComponent';
import ComponentCollection from './ComponentCollection';


export default class Container implements IContainer, IDisposable {
    private _components: ComponentCollection;
    private _isDisposed: boolean;


    public get components(): ComponentCollection {
        return this._components;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public add(component: IComponent, name?: string): void {

    }


    public remove(component: IComponent): void {

    }


    public dispose(): void {
        this._isDisposed = true;
    }
}

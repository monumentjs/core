import {Disposable} from '@monument/core/main/Disposable';
import {Enumerable} from '@monument/collections-core/main/Enumerable';
import {Set} from '@monument/collections-core/main/Set';
import {ListSet} from '@monument/collections/main/ListSet';
import {Component} from '../component/Component';


export class Container implements Disposable {
    private _components: Set<Component> = new ListSet();


    public get components(): Enumerable<Component> {
        return this._components;
    }


    public get componentsCount(): number {
        return this._components.length;
    }


    public addComponent(component: Component): boolean {
        if (this._components.add(component)) {
            component.attach(this);

            return true;
        }

        return false;
    }


    public containsComponent(component: Component): boolean {
        return this._components.contains(component);
    }


    public removeComponent(component: Component): boolean {
        if (this._components.remove(component)) {
            component.detach();

            return true;
        }

        return false;
    }


    public broadcastAction<T extends object>(action: T, sender: Component): void {
        for (let component of this._components) {
            if (component !== sender) {
                component.dispatchAction(action);
            }
        }
    }


    public dispose(): void {
        this._components.clear();
    }
}

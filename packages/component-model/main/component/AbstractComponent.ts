import {AbstractActionDispatcher} from '../action/AbstractActionDispatcher';
import {Container} from '../container/Container';
import {Component} from './Component';


export abstract class AbstractComponent extends AbstractActionDispatcher implements Component {
    private _container: Container | undefined;


    public get isAttached(): boolean {
        return this._container != null;
    }


    public attach(container: Container): boolean {
        if (this._container !== container) {
            this.detach();

            this._container = container;

            this._container.addComponent(this);

            return true;
        }

        return false;
    }


    public detach(): boolean {
        let isDetached: boolean = false;

        if (this._container) {
            isDetached = this._container.removeComponent(this);

            this._container = undefined;
        }

        return isDetached;
    }


    protected broadcastAction<T extends object>(action: T): void {
        if (this._container) {
            this._container.broadcastAction(action, this);
        }
    }
}

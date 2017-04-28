import {IDisposable} from '../../Core/types';
import {IComponent} from './IComponent';
import {ComponentCollection} from './ComponentCollection';


export interface IContainer extends IDisposable {
    readonly components: ComponentCollection;

    add(component: IComponent, name?: string): void;
    remove(component: IComponent): void;
}

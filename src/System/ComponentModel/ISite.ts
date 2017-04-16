import {IServiceProvider} from './IServiceProvider';
import {IComponent} from './IComponent';
import {IContainer} from './IContainer';


export interface ISite extends IServiceProvider {
    name: string;
    readonly component: IComponent;
    readonly container: IContainer;
    readonly designMode: boolean;
}

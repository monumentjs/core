import {IApplicationContext} from './IApplicationContext';


export interface IApplicationContextAware {
    setApplicationContext(applicationContext: IApplicationContext): void;
}

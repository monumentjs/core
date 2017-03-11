import {IDisposable} from '../../Core/types';
import {ISite} from './ISite';
import EventEmitter from '../../Core/Events/EventEmitter';


export interface IComponent extends EventEmitter, IDisposable {
    site: ISite;
}


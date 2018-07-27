import {Disposable} from 'packages/core/main/Disposable';
import {Property} from '../Property';


export interface ConfigurableProperty<T> extends Property<T>, Disposable {
    
}

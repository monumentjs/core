import {PropertyChangedEventArgs} from './PropertyChangedEventArgs';
import {Event} from '../events/Event';


export interface NotifyPropertyChanged<TTarget extends object> {
    readonly propertyChanged: Event<TTarget, PropertyChangedEventArgs>;
}

import {Event} from '@monument/events/main/Event';
import {PropertyChangedEventArgs} from './PropertyChangedEventArgs';


export interface NotifyPropertyChanged<TTarget extends object> {
    readonly propertyChanged: Event<TTarget, PropertyChangedEventArgs>;
}

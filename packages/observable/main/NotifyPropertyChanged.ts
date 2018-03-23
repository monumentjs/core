import {EventSource} from '@monument/events-core/main/EventSource';
import {PropertyChangedEventArgs} from './PropertyChangedEventArgs';


export interface NotifyPropertyChanged<TTarget extends object = object> {
    readonly propertyChanged: EventSource<TTarget, PropertyChangedEventArgs>;
}

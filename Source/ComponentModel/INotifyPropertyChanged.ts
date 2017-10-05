import {EventSource} from '../Events/EventSource';
import {PropertyChangedEventArgs} from './PropertyChangedEventArgs';


export interface INotifyPropertyChanged<TTarget extends object = object> {
    readonly propertyChanged: EventSource<TTarget, PropertyChangedEventArgs>;
}

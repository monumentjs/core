import {EventSource} from '../Events/EventSource';
import {PropertyChangedEventArgs} from './PropertyChangedEventArgs';


export interface INotifyPropertyChanged {
    readonly collectionChanged: EventSource<object, PropertyChangedEventArgs>;
}

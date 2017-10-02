import {EventSource} from '../Events/EventSource';
import {PropertyChangedEventArgs} from './PropertyChangedEventArgs';


export interface INotifyPropertyChanged {
    readonly onCollectionChanged: EventSource<object, PropertyChangedEventArgs>;
}

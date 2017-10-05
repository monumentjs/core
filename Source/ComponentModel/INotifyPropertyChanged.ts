import {EventHandler} from '../Events/EventHandler';
import {PropertyChangedEventArgs} from './PropertyChangedEventArgs';


export interface INotifyPropertyChanged<TTarget extends object = object> {
    readonly propertyChanged: EventHandler<TTarget, PropertyChangedEventArgs>;
}

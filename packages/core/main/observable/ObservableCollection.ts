import {Collection} from '../collections/Collection';
import {NotifyCollectionChanged} from './NotifyCollectionChanged';
import {Disposable} from '../Disposable';


export interface ObservableCollection<T> extends Collection<T>, Disposable, NotifyCollectionChanged<T> {

}

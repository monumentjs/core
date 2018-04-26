import {Disposable} from '@monument/core/main/Disposable';
import {Collection} from '@monument/collections/main/Collection';
import {NotifyCollectionChanged} from './NotifyCollectionChanged';


export interface ObservableCollection<T> extends Collection<T>, Disposable, NotifyCollectionChanged<T> {

}

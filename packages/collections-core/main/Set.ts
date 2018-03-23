import {Collection} from './Collection';
import {ReadOnlySet} from './ReadOnlySet';


export interface Set<T> extends ReadOnlySet<T>, Collection<T> {

}

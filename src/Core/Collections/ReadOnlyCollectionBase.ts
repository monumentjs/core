import Enumerable from './Enumerable';
import {Constructor} from '../types';


export default class ReadOnlyCollectionBase<T> extends Enumerable<T> {
    public add<TCollection extends ReadOnlyCollectionBase<T>>(item: T): TCollection {
        let collectionConstructor: Constructor<TCollection> = this.constructor as Constructor<TCollection>;
        let itemsArray: T[] = this.toArray();

        itemsArray.push(item);

        return new collectionConstructor(itemsArray);
    }

    
    public remove<TCollection extends ReadOnlyCollectionBase<T>>(item: T): TCollection {
        let collectionConstructor: Constructor<TCollection> = this.constructor as Constructor<TCollection>;
        let itemsArray: T[] = this.toArray();
        let indexOfItem: number = itemsArray.indexOf(item);

        if (indexOfItem >= 0) {
            itemsArray.splice(indexOfItem, 1);
        }

        return new collectionConstructor(itemsArray);
    }
}


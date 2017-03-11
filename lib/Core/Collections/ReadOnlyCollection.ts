import Collection from './Collection';


export default class ReadOnlyCollection<T> extends Collection<T> {
    protected _isReadOnly: boolean = true;
}

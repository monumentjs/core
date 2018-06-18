import {ReadOnlyList} from '../collections/ReadOnlyList';
import {Parameter} from './Parameter';


export interface Invokable {
    readonly parameters: ReadOnlyList<Parameter>;
    invoke(self: object, args: any[]): any;
}

import {ReadOnlyList} from '../collection/readonly/ReadOnlyList';
import {Parameter} from './Parameter';


export interface Invokable {
    readonly parameters: ReadOnlyList<Parameter>;
    invoke(self: object, args: any[]): any;
}

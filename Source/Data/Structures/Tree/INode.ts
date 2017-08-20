import {IEnumerable} from '../../../Collections/IEnumerable';


export interface INode {
    parentNode: INode | null;
    readonly childNodes: IEnumerable<INode>;
}
